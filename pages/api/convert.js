// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const regexp = /^(M\(X\)|M\(V\)|(\(V\))?)(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const map = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
};

const roman2arabic = (s) => {
  const validExpresion = regexp.test(s);
  if (validExpresion) return [...s].reduce((r, c, i, s) => (map[s[i + 1]] > map[c] ? r - map[c] : r + map[c]), 0);
  return 'NaN';
};

export default function handler(req, res) {
  const { roman } = req.body;

  const validExpresion = roman !== '' && roman !== ' ' && regexp.test(roman);

  if (validExpresion) {
    const arabic = roman2arabic(roman);
    return res.status(200).json({ arabic });
  }

  return res.status(200).json({ err: 'invalid expression' });
}
