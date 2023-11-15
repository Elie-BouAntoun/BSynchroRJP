import { Component, OnInit } from '@angular/core';

import { FeedbackSortByList, FilterOptions } from '../_shared/enum';
import { SharedFunctions } from '../_shared/shared-functions';

import { FeedbackCategory, FeedbackComment } from './feedback.model';
import { FeedbackService } from './feedback.service';

import * as $ from 'jquery';

@Component({
  selector: 'feedback',
  templateUrl: './feedback.html',
  providers: [FeedbackService]
})
export class FeedbackComponent implements OnInit {

  constructor(
    public shared_functions: SharedFunctions,
    public feedback_service: FeedbackService
  ) { }

  public enum_feedback_sort_by_list = FeedbackSortByList;
  public enum_filter_options = FilterOptions;

  // as per naming convention variables should be 'showSortByList' but since from previous companies i am used to put '_' because it is clearer i will be following this naming convention to avoid multiple naming by mistake
  public show_sort_by_list: boolean = false;
  public sort_by_list: { value: number; name: string }[] = [];
  public sort_by_value: number = FeedbackSortByList.Most_Upvotes;
  public show_filter_list: boolean = false;
  public filter_value: string = "";
  public filter_option: number = this.enum_filter_options.Equals;

  public feedback_categories_api_data: FeedbackCategory[] = [];
  public feedback_categories_list_data: FeedbackCategory[] = [];

  ngOnInit() {
    for (let i in FeedbackSortByList) {
      if (typeof FeedbackSortByList[i] === 'number') {
        this.sort_by_list.push({ value: <any>FeedbackSortByList[i], name: i.replace("_", " ") });
      }
    }

    let feedbacks_data = this.feedback_service.GetFeedbacksData();
    this.feedback_categories_api_data = feedbacks_data.feedbackCategories;
    this.feedback_categories_list_data = this.feedback_categories_api_data;

    this.ApplyFilterList();
    this.ApplySortList();
  }

  ToggleSortByList() {
    if (this.show_filter_list == true) {
      this.ToggleFilterList();
    }

    if (this.show_sort_by_list == true) {
      this.shared_functions.AnimateSectionOnClose("feedback_sort_list");

      setTimeout(() => {
        this.show_sort_by_list = false;
      }, this.shared_functions.GetAnimatedSectionTime());
    }
    else {
      this.show_sort_by_list = true;
      this.shared_functions.AnimateSectionOnShow("feedback_sort_list");
    }
  }

  // as per naming convention parameter should be 'value' but since from previous companies i am used to put 'p_' because it will be clearer that this variable is a parameter i will be following this naming convention to avoid multiple naming by mistake
  SortList(p_value: number) {
    this.ToggleSortByList();
    this.sort_by_value = p_value;
    this.ApplySortList();
  }

  ApplySortList() {
    this.feedback_categories_list_data = this.feedback_categories_list_data.sort((a, b) => {
      switch (this.sort_by_value) {        
        case FeedbackSortByList.Least_Upvotes: {
          if (a.nbOfVotes < b.nbOfVotes) {
            return -1;
          }
          else {
            return 1;
          }
        }
        case FeedbackSortByList.Most_Comments: {
          if (a.nbOfComments < b.nbOfComments) {
            return 1;
          }
          else {
            return -1;
          }
        }
        case FeedbackSortByList.Least_Comments: {
          if (a.nbOfComments < b.nbOfComments) {
            return -1;
          }
          else {
            return 1;
          }
        }
        default: { // FeedbackSortByList.Most_Upvotes
          if (a.nbOfVotes < b.nbOfVotes) {
            return 1;
          }
          else {
            return -1;
          }
        }
      }
    });
  }

  ToggleFilterList() {
    if (this.show_sort_by_list == true) {
      this.ToggleSortByList();
    }

    if (this.show_filter_list == true) {
      this.shared_functions.AnimateSectionOnClose("feedback_filter_list");

      setTimeout(() => {
        this.show_filter_list = false;
      }, this.shared_functions.GetAnimatedSectionTime());
    }
    else {
      this.show_filter_list = true;
      this.shared_functions.AnimateSectionOnShow("feedback_filter_list");
    }
  }

  SetFilterOption(p_option: number) {
    this.filter_option = p_option;
  }

  ClearFilter() {
    this.filter_value = "";
    this.filter_option = this.enum_filter_options.Equals;

    this.FilterList();
  }

  FilterList() {
    this.ToggleFilterList();
    this.ApplyFilterList();
  }

  ApplyFilterList() {
    this.feedback_categories_list_data = Object.assign([], this.feedback_categories_api_data);

    let filtered_value = this.filter_value.toLowerCase().trim();

    if (filtered_value != "") {
      this.feedback_categories_list_data = this.feedback_categories_list_data.filter(x => {
        switch (this.filter_option) {
          case this.enum_filter_options.Equals: {
            return (x.name.toLowerCase() == filtered_value);
          }
          case this.enum_filter_options.Contains: {
            return (x.name.toLowerCase().indexOf(filtered_value) > -1);
          }
          case this.enum_filter_options.Starts_With: {
            return (x.name.toLowerCase().startsWith(filtered_value));
          }
          case this.enum_filter_options.Ends_With: {
            return (x.name.toLowerCase().endsWith(filtered_value));
          }
          default: {
            return true;
          }
        }
      });
    }

    this.ApplySortList();
  }

  UpVoteCategory(p_category_id: number) {
    let category = this.feedback_categories_list_data.filter(x => x.id == p_category_id)[0];

    if (category.isVotedByCurrentUser) {
      category.errorMsg = "You can upvote a category only once";
    }
    else {
      category.nbOfVotes += 1;
      category.isVotedByCurrentUser = true;

      sessionStorage.setItem(this.feedback_service.GetSessionStorageName(), JSON.stringify(this.feedback_categories_api_data));

      $('#feedback_' + p_category_id).find(".item_vote").addClass("remove_active_mobile"); // used to remover the active/hover style on mobiles 
      $('#feedback_' + p_category_id).find(".voting_success").show().find(".mat-icon").animate({ opacity: 1 }, 1000, function () {
        $(this).animate({ opacity: 0 }, 1000, function () {
          $(this).removeAttr('style');
          $(this).parent().removeAttr('style');
          $('#feedback_' + p_category_id).find(".item_vote").removeClass("remove_active_mobile");
        });
      });
    }
  }
}
