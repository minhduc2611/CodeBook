import { Code, FormatAlignLeft, FormatPaint, LightMode } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import styles from './../../code-editor.module.scss';

const Dashboard = ({
  jsxEnabled,
  monacoEnabled,
  isJSXHighlightingOn,
  toggleJSXHighlighting,
  isJSXCommentingOn,
  toggleJSXCommenting,
  theme,
  toggleTheme,
  language,
  toggleLanguage,
  onFormatClick,
  OnRunCode
}) => {
  return (
    <div
      className={[
        styles.utility,
        theme === 'light'
          ? 'lightThemeBackgroundColor'
          : 'darkThemeBackgroundColor'
      ].join(' ')}
    >
      {/* <button disabled={!jsxEnabled} onClick={OnRunCode}>
        Run Code
      </button> */}
      <IconButton
        color="inherit"
        title="Format code"
        disabled={!jsxEnabled}
        onClick={onFormatClick}
      >
        <FormatAlignLeft />
      </IconButton>
      <IconButton
        color="inherit"
        title="Toggle JSX highlighting"
        className={isJSXHighlightingOn ? 'toggleOn' : 'toggleOff'}
        onClick={toggleJSXHighlighting}
        disabled={!jsxEnabled}
      >
        <FormatPaint />
      </IconButton>
      {/* <IconButton
        color="inherit"
        className={isJSXCommentingOn ? 'toggleOn' : 'toggleOff'}
        onClick={toggleJSXCommenting}
        disabled={!jsxEnabled}
      >
        Toggle JSX Commenting
      </IconButton> */}
      <IconButton
        color="inherit"
        title="Toggle theme"
        className={theme ? 'toggleOn' : 'toggleOff'}
        onClick={toggleTheme}
        disabled={!monacoEnabled}
      >
        <LightMode />
      </IconButton>
      <IconButton
        color="inherit"
        title="Toggle language"
        className={language ? 'toggleOn' : 'toggleOff'}
        onClick={toggleLanguage}
        disabled={!monacoEnabled}
      >
        <Code />
      </IconButton>
    </div>
  );
};

export default Dashboard;
