'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
class Resource {
	static icons: any;

	static initialize(context: vscode.ExtensionContext) {
		Resource.icons = {
			reactions: {
				THUMBS_UP: context.asAbsolutePath(path.join('resources', 'reactions', 'thumbs_up.png')),
				THUMBS_DOWN: context.asAbsolutePath(path.join('resources', 'reactions', 'thumbs_down.png')),
				CONFUSED: context.asAbsolutePath(path.join('resources', 'reactions', 'confused.png')),
				EYES: context.asAbsolutePath(path.join('resources', 'reactions', 'eyes.png')),
				HEART: context.asAbsolutePath(path.join('resources', 'reactions', 'heart.png')),
				HOORAY: context.asAbsolutePath(path.join('resources', 'reactions', 'hooray.png')),
				LAUGH: context.asAbsolutePath(path.join('resources', 'reactions', 'laugh.png')),
				ROCKET: context.asAbsolutePath(path.join('resources', 'reactions', 'rocket.png')),
			}
		};
	}
}

function getReactionGroup(): { title: string; label: string; icon: vscode.Uri }[] {
	const ret = [
		{
			title: 'CONFUSED',
			label: '😕',
			icon: Resource.icons.reactions.CONFUSED
		}, {
			title: 'EYES',
			label: '👀',
			icon: Resource.icons.reactions.EYES
		}, {
			title: 'HEART',
			label: '❤️',
			icon: Resource.icons.reactions.HEART
		}, {
			title: 'HOORAY',
			label: '🎉',
			icon: Resource.icons.reactions.HOORAY
		}, {
			title: 'LAUGH',
			label: '😄',
			icon: Resource.icons.reactions.LAUGH
		}, {
			title: 'ROCKET',
			label: '🚀',
			icon: Resource.icons.reactions.ROCKET
		}, {
			title: 'THUMBS_DOWN',
			label: '👎',
			icon: Resource.icons.reactions.THUMBS_DOWN
		}, {
			title: 'THUMBS_UP',
			label: '👍',
			icon: Resource.icons.reactions.THUMBS_UP
		}
	];

	return ret;
}

let commentId = 1;

class NoteComment implements vscode.Comment {
	id: number;
	label: string | undefined;
	constructor(
		public body: string | vscode.MarkdownString,
		public mode: vscode.CommentMode,
		public author: vscode.CommentAuthorInformation,
		public parent: vscode.CommentThread,
		public reactions: vscode.CommentReaction[] = [],
		public contextValue?: string
	) {
		this.id = ++commentId;
	}
}

export function activate(context: vscode.ExtensionContext) {
	Resource.initialize(context);
	// A `CommentController` is able to provide comments for documents.
	const commentController = vscode.comments.createCommentController('comment-sample', 'Comment API Sample');
	context.subscriptions.push(commentController);

	commentController.reactionHandler = async (c: vscode.Comment, reaction: vscode.CommentReaction) => {
		const comment = c as NoteComment;
		if (!comment.parent) {
			return;
		}

		comment.parent.comments = comment.parent.comments.map(cmt => {
			if ((cmt as NoteComment).id === comment.id) {
				const index = cmt.reactions!.findIndex(r => r.label === reaction.label);
				cmt.reactions!.splice(index, 1, {
					...reaction,
					count: reaction.authorHasReacted ? reaction.count - 1 : reaction.count + 1,
					authorHasReacted: !reaction.authorHasReacted,
				});
			}

			return cmt;
		});
	}
	// A `CommentingRangeProvider` controls where gutter decorations that allow adding comments are shown
	commentController.commentingRangeProvider = {
		provideCommentingRanges: (document: vscode.TextDocument, token: vscode.CancellationToken) => {
			const lineCount = document.lineCount;
			return [new vscode.Range(0, 0, lineCount - 1, 0)];
		}
	};

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.createNote', (reply: vscode.CommentReply) => {
		replyNote(reply);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.replyNote', (reply: vscode.CommentReply) => {
		replyNote(reply);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.startDraft', (reply: vscode.CommentReply) => {
		const thread = reply.thread;
		thread.contextValue = 'draft';
		const newComment = new NoteComment(reply.text, vscode.CommentMode.Preview, { name: 'vscode' }, thread);
		newComment.label = 'pending';
		thread.comments = [...thread.comments, newComment];
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.finishDraft', (reply: vscode.CommentReply) => {
		const thread = reply.thread;

		if (!thread) {
			return;
		}

		thread.contextValue = undefined;
		thread.collapsibleState = vscode.CommentThreadCollapsibleState.Collapsed;
		if (reply.text) {
			const newComment = new NoteComment(reply.text, vscode.CommentMode.Preview, { name: 'vscode' }, thread);
			thread.comments = [...thread.comments, newComment].map(comment => {
				comment.label = undefined;
				return comment;
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.deleteNoteComment', (comment: NoteComment) => {
		const thread = comment.parent;
		if (!thread) {
			return;
		}

		thread.comments = thread.comments.filter(cmt => (cmt as NoteComment).id !== comment.id);

		if (thread.comments.length === 0) {
			thread.dispose();
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.deleteNote', (thread: vscode.CommentThread) => {
		thread.dispose();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.cancelsaveNote', (comment: NoteComment) => {
		if (!comment.parent) {
			return;
		}

		comment.parent.comments = comment.parent.comments.map(cmt => {
			if ((cmt as NoteComment).id === comment.id) {
				cmt.mode = vscode.CommentMode.Preview;
			}

			return cmt;
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.saveNote', (comment: NoteComment) => {
		if (!comment.parent) {
			return;
		}

		comment.parent.comments = comment.parent.comments.map(cmt => {
			if ((cmt as NoteComment).id === comment.id) {
				cmt.mode = vscode.CommentMode.Preview;
			}

			return cmt;
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.editNote', (comment: NoteComment) => {
		if (!comment.parent) {
			return;
		}

		comment.parent.comments = comment.parent.comments.map(cmt => {
			if ((cmt as NoteComment).id === comment.id) {
				cmt.mode = vscode.CommentMode.Editing;
			}

			return cmt;
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('mywiki.dispose', () => {
		commentController.dispose();
	}));

	function replyNote(reply: vscode.CommentReply) {
		const thread = reply.thread;
		const newComment = new NoteComment(
			reply.text,
			vscode.CommentMode.Preview,
			{ name: 'vscode' },
			thread,
			getReactionGroup().map(reaction => ({
				iconPath: reaction.icon,
				label: reaction.label,
				count: 0,
				authorHasReacted: false,
			})),
			thread.comments.length ? 'canDelete' : undefined
		);
		if (thread.contextValue === 'draft') {
			newComment.label = 'pending';
		}

		thread.comments = [...thread.comments, newComment];
	}
}
