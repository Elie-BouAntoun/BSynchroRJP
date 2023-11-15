export interface FeedbackCategory {
  id: number;
  name: string;
  description: string;
  isVotedByCurrentUser?: boolean // computed field to check if this category was upvoted by the curent user 
  nbOfVotes: number; // computed field to count the votes of this category
  nbOfComments: number; // computed field to count the comments added for this category
  categoryComments?: FeedbackComment[]; // computed field to store the related comments in order to list them as cards when a category is expanded
  errorMsg?: string; // computed field
}

export interface FeedbackComment {
  id: number;
  feedbackCategoryID: number;
  title: string;
  text: string;
  isByCurrentUser?: boolean // computed field to highlight the comments added by the curent user
}
