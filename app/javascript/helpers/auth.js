
//Used in a few places to refresh CSRF token as necessary (e.g. after logging in, logging out)
export function updateCSRF(response){
  var csrf_param = response.headers.get('X-CSRF-Param');
  var csrf_param_field = document.getElementsByName("csrf-param")[0];
  var csrf_token = response.headers.get('X-CSRF-Token');
  var csrf_token_field = document.getElementsByName("csrf-token")[0];
  if (csrf_param) {
    csrf_param_field.setAttribute("content", csrf_param);
  }
  if (csrf_token) {
    csrf_token_field.setAttribute("content", csrf_token);
  }
}