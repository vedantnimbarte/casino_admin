import { useEffect, useState } from 'react';
import { Box, InputLabel, FormControl, OutlinedInput, Button, ButtonGroup } from '@mui/material';
import { ContentState, EditorState, convertToRaw, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { IconEdit as SaveIcon, IconRefresh as ResetIcon, IconEye as PreviewIcon } from '@tabler/icons';

import { useDispatch, useSelector } from 'react-redux';
import { updateSettings, getSettingsData } from 'store/thunk/configuration/settings.thunk';
import AlertComponent from 'components/Alert';
import { setUpdatedData } from 'store/reducers/configuration/settings.reducer';

function Form({ pageTitle }) {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const htmlContent = settings.data.DESCRIPTION || `<h2>${pageTitle}</h2>`;
        const blocksFromHTML = convertFromHTML(htmlContent);
        const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
        setEditorState(() => EditorState.createWithContent(state));
    }, [settings.data.DESCRIPTION]);

    useEffect(() => {
        dispatch(getSettingsData(pageTitle));
    }, []);

    useEffect(() => {
        const Title = settings.data.TITLE;
        const Description = settings.data.DESCRIPTION;
        setTitle(Title);
        setDescription(Description);
    }, [settings.data]);

    useEffect(() => {
        setDescription(stateToHTML(editorState.getCurrentContent()));
    }, [editorState]);

    useEffect(() => {
        dispatch(setUpdatedData({ TITLE: title, DESCRIPTION: description }));
    }, [title, editorState]);

    return (
        <>
            <Box>
                <FormControl fullWidth>
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <OutlinedInput value={title} name="title" id="title" label="Title" />
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
