import * as Yup from 'yup';

const reqString = Yup.string()
  .trim('Invalid')
  .min(1, 'Required')
  .required('Required');

const reqNum = Yup.number()
  .min(0, 'Positive numbers only')
  .max(100, 'Measurements in cm');

export default Yup.object().shape({
  name: reqString,
  limb: reqString,
  type: reqString,
  compressionLevel: reqString,
  brand: reqString,
  sizeLabel: reqString,
  lengths: Yup.string().trim('Invalid'),
  notes: Yup.string().trim('Invalid'),
  aMin: reqNum,
  aMax: reqNum,
  bMin: reqNum,
  bMax: reqNum,
  b1Min: reqNum,
  b1Max: reqNum,
  cMin: reqNum,
  cMax: reqNum,
  c1Min: reqNum,
  c1Max: reqNum,
  dMin: reqNum,
  dMax: reqNum,
  eMin: reqNum,
  eMax: reqNum,
  e1Min: reqNum,
  e1Max: reqNum,
  fMin: reqNum,
  fMax: reqNum,
  gMin: reqNum,
  gMax: reqNum,
  yMin: reqNum,
  yMax: reqNum,
});
