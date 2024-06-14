import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import Underline from "@editorjs/underline";
import Marker from "@editorjs/marker";
import List from '@editorjs/list';
import Table from '@editorjs/table';
import LinkTool from '@editorjs/link';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Checklist from '@editorjs/checklist';
import InlineCode from '@editorjs/inline-code';
import Quote from '@editorjs/quote';
import Raw from '@editorjs/raw';
import CodeBlock from '@editorjs/code';
import Embed from '@editorjs/embed';
import TextVariantTune from '@editorjs/text-variant-tune';
import ImageTool from '@editorjs/image';
import SimpleImage from '@editorjs/simple-image';

import { doc, setDoc } from 'firebase/firestore';
import { db } from "@/services/firebase";

const DEFAULT_INITIAL_DATA = {
    "time": new Date().getTime(),
    "blocks": [
        {
            "type": "header",
            "placeholder": "This is my awesome editor!",
            "data": {
                "level": 4
            }
        },
    ]
};

const EditorComponent = ({ projectId, uid, initialData, onEdit }) => {
    const ejInstance = useRef(null);
    const editorContainerRef = useRef(null);

    const initEditor = () => {
        if (editorContainerRef.current && !ejInstance.current) {
            const editor = new EditorJS({
                holder: editorContainerRef.current,
                onReady: () => {
                    ejInstance.current = editor;
                },
                autofocus: true,
                data: initialData || DEFAULT_INITIAL_DATA,
                onChange: async () => {
                    if (onEdit) onEdit();
                    const content = await editor.saver.save();

                    if (uid && projectId) {
                        try {
                            const docRef = doc(db, "editorData", projectId);
                            await setDoc(docRef, {
                                content,
                                uid,
                                projectId,
                                timestamp: new Date()
                            }, { merge: true });
                        } catch (e) {
                            console.error("Error setting document: ", e);
                        }
                    } else {
                        console.log("User is not logged in or projectId is missing");
                    }
                },
                tools: {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+H',
                        config: {
                            levels: [1, 2, 3, 4, 5],
                            defaultLevel: 2,
                        }
                    },
                    underline: {
                        class: Underline,
                    },
                    warning: {
                        class: Warning,
                        inlineToolbar: true,
                        shortcut: 'CMD+SHIFT+W',
                        config: {
                            titlePlaceholder: 'Title',
                            messagePlaceholder: 'Message',
                        },
                    },
                    marker: {
                        class: Marker,
                    },
                    list: List,
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                    },
                    table: Table,
                    link: LinkTool,
                    delimiter: Delimiter,
                    checklist: Checklist,
                    inlineCode: InlineCode,
                    quote: Quote,
                    raw: Raw,
                    attaches: {
                        class: AttachesTool,
                    },
                    code: CodeTool,
                    embed: {
                        class: Embed,
                        config: {
                            services: {
                                youtube: true,
                                coub: true,
                                vimeo: true,
                                codepen: true,
                                instagram: true,
                                facebook: true,
                                twitter: true,
                                linkedin: true,
                                github: true,
                                reddit: true,
                                tiktok: true,
                                soundcloud: true,
                            }
                        }
                    },
                    textVariantTune: TextVariantTune,
                    image: ImageTool,
                    simpleImage: SimpleImage,
                },
            });
        }
    };

    useEffect(() => {
        initEditor();

        return () => {
            if (ejInstance.current) {
                ejInstance.current.destroy();
                ejInstance.current = null;
            }
        };
    }, [uid, projectId]);

    return <div id="editorjs" ref={editorContainerRef}></div>;
}

EditorComponent.propTypes = {
    projectId: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    initialData: PropTypes.object,
    onEdit: PropTypes.func,
};

export default EditorComponent;
