var templateString = "<div class='person'>" +
  "  <span class='name'><%= name %></span>" +
  "  <span class='occupation'><%= occupation %></span>" +
  "</div>";
var templateFunction = _.template(templateString);
