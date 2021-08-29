import TextField from '@material-ui/core/TextField';
import {
  withStyles,
} from '@material-ui/core/styles';

const RomanscolorTheme = '#a30a4b';
const ArabiccolorTheme = '#2f8fb2';

export const RomansTextField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: RomanscolorTheme,
    },
    '& label.Mui-focused': {
      color: RomanscolorTheme,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: RomanscolorTheme,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: RomanscolorTheme,
      },
      '&:hover fieldset': {
        borderColor: RomanscolorTheme,
      },
      '&.Mui-focused fieldset': {
        borderColor: RomanscolorTheme,
        border: '1px solid',
      },
    },
  },
})(TextField);

export const ArabicsTextField = withStyles({
  root: {
    '& .MuiFormLabel-root': {
      color: ArabiccolorTheme,
    },
    '& label.Mui-focused': {
      color: ArabiccolorTheme,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: ArabiccolorTheme,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: ArabiccolorTheme,
      },
      '&:hover fieldset': {
        borderColor: ArabiccolorTheme,
      },
      '&.Mui-focused fieldset': {
        borderColor: ArabiccolorTheme,
        border: '1px solid',
      },
    },
  },
})(TextField);
