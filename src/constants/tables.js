/**
 * @file It contains table constants that are used to pass to v-data-table component.
 */
 export default {
  RESULTS: {
    headers: [{
      text : "Value",
      align: "left",
      value: "value",
      class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold"
    }, {
      text : "Sent time (in ms)",
      align: "left",
      value: "sentTime",
      class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold"
    }, {
      text : "Processing time (in ms)",
      align: "left",
      value: "processingTime",
      class: "subheading primary lighten-2 white--text subtitle-2 font-weight-bold"
    }],
    noDataText  : "No data found.",
    itemsPerPage: 10,
    footer      : {
      itemsPerPageOptions: [10, 20, 30],
      itemsPerPageText   : "Items per page",
      showFirstLastPage  : true,
      showCurrentPage    : true
    }
  }
 }