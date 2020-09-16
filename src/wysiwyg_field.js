// https://ckeditor.com/docs/ckeditor5/latest/index.html

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
// import Color from 'color'

import { FormLabel } from '@material-ui/core'

// import colorSettings from './colors.js'

import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'

import Heading from '@ckeditor/ckeditor5-heading/src/heading'

import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'

import Font from '@ckeditor/ckeditor5-font/src/font'

import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough'
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline'
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript'
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript'

import Table from '@ckeditor/ckeditor5-table/src/table'
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar'
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties'
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties'

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'

import List from '@ckeditor/ckeditor5-list/src/list'
import TodoList from '@ckeditor/ckeditor5-list/src/todolist'

// import Link from '@ckeditor/ckeditor5-link/src/link'

import Indent from '@ckeditor/ckeditor5-indent/src/indent'
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock'

// import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed'

// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage'

// import Image from '@ckeditor/ckeditor5-image/src/image'
// import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
// import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
// import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
// import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
// import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'

// import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository'

import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote'

import withGuid from './hocs/with_guid.js'
import withHelperText from './hocs/with_helper_text.js'

import {
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove
} from './constants.js'

const styles = (theme) => ({
  root: {},
  editorContainer: {
    position: 'relative',
    '& .ck-content': {
      minHeight: '250px',
      border: `1px solid #333 !important`,
      borderRadius: '0px 0px 4px 4px !important',
      padding: '0px 15px'
    },
    '& .ck-editor__editable.ck-focused': {
      border: `1px solid #019688 !important`,
      boxShadow: 'none !important'
    },
    '& p': {
      marginTop: '0px',
      marginBottom: '20px'
    },
    '& p:last-child': {
      marginBottom: '0px'
    },
    '& ul, & ol': {
      paddingLeft: '45px',
      '@media (max-width: 768px)': {
        paddingLeft: '25px'
      }
    },
    '& ol li, & ul li': {
      marginBottom: '5px !important'
    },
    '& ul li:last-child, & ol li:last-child': {
      marginBottom: '0px'
    },
    '& ul li': {
      position: 'relative'
    },
    "& figure.table[style*='float:left'], figure.table[style*='float: left']": {
      paddingLeft: '0px',
      paddingRight: '15px'
    },
    "& figure.table[style*='float:right'], figure.table[style*='float: right']": {
      paddingLeft: '15px',
      paddingRight: '0px'
    }
  },
  error: {
    '& .ck-content': {
      backgroundColor: 'rgba(255, 0, 0, .1)!important'
    }
  }
})

/**
 * Callback for inputs
 * @callback WYSIWYGField~onChange
 * @param {string} value input's new value
 */

/**
 * return (
 *   <WYSIWYGField onChange = { (value) => {
 *                  // Some actions
 *                 } }
 *                 value = { "<b>value</b>" } />
 * )
 */
class WYSIWYGField extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChange = this.onChange.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    let value

    const propsValue = `${props.value || ''}`.trim()
    let defaultValue = `${state.defaultValue || ''}`.trim()
    const stateValue = `${state.value || ''}`.trim()

    if (defaultValue !== propsValue) {
      defaultValue = propsValue
      value = propsValue
    } else {
      value = stateValue
    }

    const newState = {
      value: value,
      defaultValue: defaultValue
    }

    return newState
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.value !== nextState.value ||
      this.props.displayName !== nextProps.displayName ||
      this.props.hasError !== nextProps.hasError
    )
  }

  onChange(event, editor) {
    const { onChange } = this.props
    const data = editor.getData()

    this.setState({
      value: data
    })

    if (onChange) {
      onChange(data)
    }
  }

  config() {
    // https://ckeditor5.github.io/docs/nightly/ckeditor5/latest/features/table.html
    const { extraPlugins, toolbarItems, viewportTopOffset } = this.props

    return {
      plugins: [
        Autoformat,
        Essentials,
        Heading,
        Paragraph,
        Font,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Superscript,
        Subscript,
        Alignment,
        Table,
        TableToolbar,
        TableProperties,
        TableCellProperties,
        Indent,
        IndentBlock,
        List,
        TodoList,
        // Link,
        // MediaEmbed,
        // FileRepository,
        BlockQuote
        // EasyImage,
        // Image,
        // ImageToolbar,
        // ImageCaption,
        // ImageStyle,
        // ImageResize,
        // ImageUpload
      ],
      toolbar: {
        viewportTopOffset: viewportTopOffset,
        items: toolbarItems
      },
      image: {
        resizeUnit: 'px',
        toolbar: [
          'imageTextAlternative',
          '|',
          'imageStyle:alignLeft',
          'imageStyle:full',
          'imageStyle:alignRight'
        ],
        styles: ['full', 'alignLeft', 'alignRight']
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells',
          'tableProperties',
          'tableCellProperties'
        ]
        // tableProperties: {
        //   borderColors: colorSettings.colors,
        //   backgroundColors: colorSettings.colors
        // },
        // tableCellProperties: {
        //   borderColors: colorSettings.colors,
        //   backgroundColors: colorSettings.colors
        // }
      },
      // fontColor: colorSettings,
      // fontBackgroundColor: colorSettings,
      extraPlugins: extraPlugins
    }
  }

  render() {
    const { classes, guid, hasError } = this.props

    const { displayName } = this.props

    const { value } = this.state

    return (
      <div className={classes.root}>
        <FormLabel htmlFor={guid} error={hasError}>
          {`${displayName}:`}
        </FormLabel>
        <div
          className={clsx({
            [classes.editorContainer]: true,
            [classes.error]: hasError
          })}
        >
          <CKEditor
            editor={ClassicEditor}
            config={this.config()}
            data={value}
            onInit={(editor) => {
              this.editor = editor
              // console.log(Array.from( editor.ui.componentFactory.names() ))
            }}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

WYSIWYGField.propTypes = {
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  extraPlugins: PropTypes.array,
  viewportTopOffset: PropTypes.number
}

WYSIWYGField.defaultProps = {
  displayNamePosition: InputLabelDisplayModeInside,
  extraPlugins: [],
  toolbarItems: [
    'heading',
    '|',
    'fontSize',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'alignment:left',
    'alignment:center',
    'alignment:right',
    'alignment:justify',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'subscript',
    'superscript',
    'link',
    'blockQuote',
    '|',
    'bulletedList',
    'numberedList',
    '|',
    'indent',
    'outdent',
    '|',
    'imageUpload',
    'insertTable',
    'mediaEmbed',
    '|',
    'undo',
    'redo'
  ],
  viewportTopOffset: 0
}

export default compose(
  withGuid,
  withHelperText,
  withStyles(styles)
)(WYSIWYGField)
