import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Box, InputLabel, TextField, FormControl, Typography } from '@mui/material';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Form() {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [title, setTitle] = useState('');

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" />
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
    );
}

export default Form;
