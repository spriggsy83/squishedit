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
  garmentType: reqString,
  compressionLevel: reqString,
  brand: reqString,
  sizeLabel: reqString,
  lengths: Yup.string().trim('Invalid'),
  notes: Yup.string().trim('Invalid'),
  aMin: reqNum,
  aMax: reqNum,
  bMin: reqNum,
  bMax: reqNum,
  cMin: reqNum,
  cMax: reqNum,
  dMin: reqNum,
  dMax: reqNum,
  eMin: reqNum,
  eMax: reqNum,
  fMin: reqNum,
  fMax: reqNum,
  gMin: reqNum,
  gMax: reqNum,
});
