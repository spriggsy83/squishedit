import { createMuiTheme } from '@material-ui/core/styles';
import { pink, lightGreen, orange } from '@material-ui/core/colors';

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: { main: process.env.REACT_APP_PRIMARY_COLOUR || pink['A400'] },
    secondary: { main: process.env.REACT_APP_SECOND_COLOUR || pink['A100'] },
    goodFit: {
      main: process.env.REACT_APP_GOODFIT_COLOUR || lightGreen['A100'],
    },
    nearFit: {
      main: process.env.REACT_APP_GOODFIT_COLOUR || orange['A100'],
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: defaultTheme.spacing(1),
      },
    },
    MuiContainer: {
      root: {
        paddingTop: defaultTheme.spacing(1),
        paddingBottom: defaultTheme.spacing(1),
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
    /*    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor:
            (process.env.REACT_APP_SECOND_COLOUR || pink['A100']) +
            ' !important',
        },
      },
    },*/
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
