export const serializeData = function (form) {
  const isInvalidFieldForSerialization = (field) => {
    if (!field) {
      return false;
    }

    return (
      !field.name ||
      field.disabled ||
      field.type === 'file' ||
      field.type === 'reset' ||
      field.type === 'submit' ||
      field.type === 'button'
    );
  };

  const serializeMultiSelectField = (field) => {
    const serialized = [];

    if (field.type === 'select-multiple') {
      for (let n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(
          encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value)
        );
      }
    }

    return serialized;
  };

  const serializeBasicAndCheckableFields = (field) => {
    if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      return [encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value)];
    }

    return [];
  };

  const serialize = (form) => {
    let serialized = [];
    const formFields = form.elements;

    for (let i = 0; i < formFields.length; i++) {
      let field = form.elements[i];

      if (isInvalidFieldForSerialization(field)) continue;
      serialized = serialized.concat(serializeMultiSelectField(field));
      serialized = serialized.concat(serializeBasicAndCheckableFields(field));
    }

    return serialized.join('&');
  };

  return serialize(form);
};
