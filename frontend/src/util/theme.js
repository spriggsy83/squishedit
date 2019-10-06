import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: process.env.REACT_APP_PRIMARY_COLOUR || pink['A400'] },
    secondary: { main: process.env.REACT_APP_SECOND_COLOUR || pink['A100'] },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: defaultTheme.spacing(2),
      },
    },
    MuiContainer: {
      root: {
        paddingTop: defaultTheme.spacing(2),
        paddingBottom: defaultTheme.spacing(2),
      },
    },
    MuiListItem: {
      root: {
        '&:hover': {
          backgroundColor:
            (process.env.REACT_APP_SECOND_COLOUR || pink['A100']) +
            ' !important',
        },
      },
    },
    MUIDataTableBodyRow: {
      root: {
        '&:hover': {
          backgroundColor:
            (process.env.REACT_APP_SECOND_COLOUR || pink['A100']) +
            ' !important',
        },
      },
    },
    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor:
            (process.env.REACT_APP_SECOND_COLOUR || pink['A100']) +
            ' !important',
        },
      },
    },
    MuiButtonBase: {
      root: {
        '&:hover': {
          backgroundColor:
            (process.env.REACT_APP_SECOND_COLOUR || pink['A100']) +
            ' !important',
        },
      },
    },
  },
});

export default theme;
