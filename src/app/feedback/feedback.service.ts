import { Injectable } from '@angular/core';

import { FeedbackCategory, FeedbackComment } from './feedback.model';

@Injectable()
export class FeedbackService {
  GetSessionStorageName(): string {
    return "FeedbackData";
  }

  GetFeedbacksData(): { feedbackCategories: FeedbackCategory[]; feedbackComments: FeedbackComment[] } {
    let feedback_categories: FeedbackCategory[] = [];
    let feedback_comments: FeedbackComment[] = [];

    let data = sessionStorage.getItem(this.GetSessionStorageName());

    if (data == null) {
      feedback_categories = this.GetFeedbackCategories();
      feedback_comments = this.GetFeedbackComments();
    }
    else {
      feedback_categories = JSON.parse(data);
    }

    return {
      feedbackCategories: feedback_categories,
      feedbackComments: feedback_comments
    };
  }

  GetFeedbackCategories(): FeedbackCategory[] {
    return [
      {
        id: 1,
        name: "Add Tags for solution",
        description: "Easier to search for solutions based ona specific stack",
        nbOfVotes: 112,
        nbOfComments: 2
      },
      {
        id: 2,
        name: "Add a dark theme option",
        description: "It would help people with light sensitivities and who prefer dark mode",
        nbOfVotes: 99,
        nbOfComments: 4
      },
      {
        id: 3,
        name: "Q&A within the challenge hubs",
        description: "Challenge-specific Q&A would make for easy reference",
        nbOfVotes: 65,
        nbOfComments: 1
      },
      {
        id: 4,
        name: "Allow image/video upload to feedback",
        description: "Images and screencasts ca nenhance comments on solutions",
        nbOfVotes: 51,
        nbOfComments: 2
      },
      {
        id: 5,
        name: "Ability to follow others",
        description: "Stay updated on comments and solutions other people post",
        nbOfVotes: 42,
        nbOfComments: 3
      },
      {
        id: 6,
        name: "Preview images not loading",
        description: "Challenge preview images are missing when you apply a filter",
        nbOfVotes: 3,
        nbOfComments: 0
      }
    ];
  }

  GetFeedbackComments(): FeedbackComment[] {
    return [];
  }
}
