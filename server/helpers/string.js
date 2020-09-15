// eslint-disable-next-line import/prefer-default-export
export const normalizeString = (string) =>
    string
        ? string
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .trim()
              .toLowerCase()
        : '';
