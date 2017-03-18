d3.request("/data/animals_piped.txt")
  .mimeType("text/plain")
  .response(function(xhr) { return psv.parse(xhr.responseText) })
  .get(function(data) {
    console.log("pipe-delimited data:")
    console.log(data[1]);
  });
