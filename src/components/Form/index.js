import { useEffect, useMemo, useState , useCallback} from 'react';
import { Box, InputLabel, TextField, FormControl, OutlinedInput } from '@mui/material';
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, getSettingsData } from 'store/thunk/configuration/settings.thunk';
import AlertComponent from 'components/Alert';

function Form({ pageTitle, updateStatus }) {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    

    useEffect(() => {
        const htmlContent = settings.data.DESCRIPTION || `<h3>${pageTitle}</h3>`;
        const blocksFromHTML = convertFromHTML(htmlContent);
        const state =  ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        setEditorState(() => EditorState.createWithContent(state))
    }, [settings.data.DESCRIPTION]);

    useEffect(() => {
        dispatch(getSettingsData(pageTitle));
        setTitle(settings.data.TITLE);
        console.log(settings.data.TITLE)
        setDescription(settings.data.DESCRIPTION);
    }, []);


    useEffect(
    () => {
          setDescription(stateToHTML(editorState.getCurrentContent()))
    }, [editorState]);
        

    useEffect(() => {
        if(title && description) {
            dispatch(updateSettings({ title, description, pageTitle, id: settings.data.SETTING_ID && settings.data.SETTING_ID }));
        }
    }, [updateStatus]);

    return (
        <>
            <Box>
                <FormControl fullWidth>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <OutlinedInput value={pageTitle} name="title" id="title"  label="Title" />
                </FormControl>
                <Box>
                    <InputLabel style={{ padding: 10 }}>Description</InputLabel>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={setEditorState}
                        wrapperStyle={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 10 }}
                        editorStyle={{ padding: '1rem', border: '1px solid #ccc', borderRadius: 10, height: '30rem' }}
                        toolbarStyle={{ border: '1px solid #ccc', padding: '1rem', borderRadius: 10 }}
                    />
                </Box>
            </Box>
            {settings.status === 'failed' && <AlertComponent status="false" message={settings.msg} />}
            {settings.status === 'success' && <AlertComponent status="true" message={settings.msg} />}
        </>
    );
}

export default Form;
