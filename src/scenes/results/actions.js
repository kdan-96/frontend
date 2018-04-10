import Parse from "parse";
import history from "./../../main/history";

export const results_fetched = results => {
  return {
    type: "RESULTS_FETCHED",
    payload: results
  };
};

export const search_query_updated = search_query => {
  return {
    type: "SEARCH_QUERY_UPDATED",
    payload: search_query
  };
};

export const toggle_tag_from_search_query = (
  current_search_query,
  item_tag
) => {
  return dispatch => {
    let search_params = current_search_query;
    if (current_search_query.tags.length) {
      // if tags present in url
      let selected_tags_array = current_search_query.tags.splice("+");
      let tags_str = "";
      if (selected_tags_array.includes(item_tag)) {
        // if tag already present, remove it
        let new_arr = selected_tags_array.filter(tag => tag !== item_tag);
        selected_tags_array = new_arr;
        tags_str = new_arr.join("+");
      } else {
        // if tag was not present, add it
        selected_tags_array.push(item_tag);
        tags_str = selected_tags_array.join("+");
      }
      search_params.tags = selected_tags_array;
    } else {
      // If No tags yet
      if (item_tag) {
        search_params.tags.push(item_tag);
      }
    }
    dispatch(update_path(search_params));
    // will trigger update_search_query from results_container
  };
};

export const update_path = search_params => {
  return dispatch => {
    let results_path = "/results";
    let tags = "";
    if (!search_params.type.length) {
      if (search_params.tags.length) {
        tags = search_params.tags.join("+");
        results_path = results_path + "?tags=" + tags;
      } else {
        console.log("no service_types and no tags");
      }
    } else {
      results_path =
        results_path + "?service_types=" + search_params.type.join("+");
      if (search_params.tags.length) {
        tags = search_params.tags.join("+");
        results_path = results_path + "&tags=" + tags;
      } else {
        console.log("no service_types and no tags");
      }
    }
    history.push(results_path);
    // will trigger update_search_query from results_container
  };
};

/* called from componentWillUpdate of results_container */
/* is triggered whenever service_types or tags props have changed */
export const update_search_query = search_params => {
  return dispatch => {
    dispatch(search_query_updated({ search_query: search_params }));
    dispatch(fetch_results(search_params));
  };
};

export const fetch_results = result_search_query => {
  return dispatch => {
    Parse.Cloud.run("fetch_results_search_query", {
      search_query: result_search_query
    }).then(results => {
      dispatch(results_fetched(results));
    });
  };
};