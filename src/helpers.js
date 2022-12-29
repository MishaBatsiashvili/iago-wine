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

  const serializeTextualAndCheckableField = (field) => {
    const invalidFieldTypes = ['checkbox', 'radio', 'select-multiple'];
    const isFieldTextualOrChecked = isValidFieldType(field, invalidFieldTypes) || field.checked;

    if (isFieldTextualOrChecked) {
      return [encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value)];
    }

    return [];
  };

  const serialize = (form) => {
    let serializedFields = [];
    const formFields = form.elements;
    const serializationPipeline = [serializeMultiSelectField, serializeTextualAndCheckableField];

    formFields.forEach((field) => {
      if (isInvalidFieldForSerialization(field)) return;

      serializationPipeline.forEach((func) => {
        serializedFields = serialize.concat(func(field));
      });
    });

    return serializedFields.join('&');
  };

  return serialize(form);
};

export const isValidFieldType = (field, invalidFieldTypes) => {
  return invalidFieldTypes.filter((type) => type === field.type).length === 0;
};
