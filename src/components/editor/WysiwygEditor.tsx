import JoditEditor from 'jodit-react';
import { TOOLBAR_BUTTONS } from './ToolBarButtons';

export interface IExtraButton {
  name: string;
  exec: (editor: any) => void;
  icon?: string;
  tooltip?: string;
}

export interface ITextEditorConfigs {
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  extraButtons?: IExtraButton[];
  height?: number;
  buttons?: string;
  toolbarButtonSize?: 'small' | 'tiny' | 'xsmall' | 'middle' | 'large';
}

export interface ITextEditorProps {
  editorContent: any;
  setEditorContent: any;
  editorConfig?: ITextEditorConfigs;
}

const TextEditor = ({ editorContent, setEditorContent, editorConfig }: ITextEditorProps) => {
  const basicEditorConfig = {
    toolbarSticky: true,
    spellcheck: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    autoHeight: false,
    allowResizeY: false,
    allowResizeX: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    showTooltip: true,
    showTooltipDelay: 0,
    iframe: true,
    editHTMLDocumentMode: true,
    iframeStyle: '',
    style: {
      background: 'white'
    },
    minHeight: (editorConfig?.height && editorConfig?.height - 40) || 400
  };

  const initialEditorConfig: ITextEditorConfigs = {
    disabled: editorConfig?.disabled || false,
    readonly: editorConfig?.readonly || false,
    placeholder: editorConfig?.placeholder || '',
    toolbarButtonSize: editorConfig?.toolbarButtonSize || 'small',
    height: editorConfig?.height || 400,
    buttons: editorConfig?.buttons || TOOLBAR_BUTTONS.toString()
  };

  return (
    <div>
      <JoditEditor
        value={editorContent}
        config={{...basicEditorConfig, ...initialEditorConfig}}
        onBlur={(newContent) => setEditorContent(newContent)}
      />
    </div>
  );
};

export default TextEditor;
