import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode: 'light',
    appbar: {
      default: 'rgba(0,0,0,0.9)'
    }
  }
});

export default Theme;

declare module '@mui/material/styles' {
  interface Palette {
    appbar: Palette['background'];
  }
  interface PaletteOptions {
    appbar: PaletteOptions['background'];
  }
}
