const construct = element => {
  let selector = "";

  const name = element["name"];
  if (name) {
    selector += '[name="' + name + '"]';

    return selector;
  }

  if (element.id) {
    selector += "#" + element.id;

    return selector;
  }

  if (element.className) {
    selector += "." + element.className.split(" ").join(".");
  }

  const form = element["form"];
  if (form && form.id) {
    selector = "#" + form.id + " " + selector;
  }

  return selector;
};

export { construct };
