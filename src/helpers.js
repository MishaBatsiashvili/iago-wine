/**
 * This function validates, serializes and then transforms the form fields into a query string
 */
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

  const serializeTextualAndCheckableFields = (field) => {
    if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      return [encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value)];
    }

    return [];
  };

  const serialize = (form) => {
    let serialized = [];
    const formFields = form.elements;
    const serializationPipeline = [serializeMultiSelectField, serializeTextualAndCheckableFields];

    formFields.forEach((field) => {
      if (isInvalidFieldForSerialization(field)) return;

      serializationPipeline.forEach((func) => {
        serialized = serialize.concat(func(field));
      });
    });

    return serialized.join('&');
  };

  return serialize(form);
};
