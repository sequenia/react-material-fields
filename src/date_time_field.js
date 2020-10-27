// https://material-ui-pickers.dev/

import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import { FormLabel } from '@material-ui/core'

import { compose } from 'recompose'
import { withStyles } from '@material-ui/styles'
import withHelperText from './hocs/with_helper_text.js'
import withGuid from './hocs/with_guid.js'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'

import {
  InputVariantStandard,
  InputVariantOutlined,
  InputVariantFilled,
  InputLabelDisplayModeInside,
  InputLabelDisplayModeAbove
} from './constants.js'

const styles = (theme) => ({})

class DateTimePicker extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onChange = this.onChange.bind(this)
    moment.locale(this.props.locale)
  }

  static getDerivedStateFromProps(props, state) {
    let value

    const { value: propsValue = null } = props
    let { defaultValue, value: stateValue = null } = state

    if ((!defaultValue && propsValue) || defaultValue !== propsValue) {
      defaultValue = propsValue
      value = propsValue
    } else {
      value = stateValue
    }

    return {
      value: value,
      defaultValue: defaultValue
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.value !== nextState.value ||
      this.props.displayName !== nextProps.displayName ||
      this.props.hasError !== nextProps.hasError ||
      this.props.readOnly !== nextProps.readOnly
    )
  }

  onChange(newDate) {
    const { value } = this.state

    const { onChange } = this.props

    const { defaultHours, defaultMinutes, defaultSeconds } = this.props

    const newDateIsValid = newDate && newDate.isValid()

    if (!value && newDateIsValid) {
      if (defaultHours) {
        newDate = newDate.hours(defaultHours)
      }
      if (defaultMinutes) {
        newDate = newDate.minutes(defaultMinutes)
      }
      if (defaultSeconds) {
        newDate = newDate.seconds(defaultSeconds)
      }
    }

    const newValue = newDateIsValid
      ? DateTimePicker.subtractOffset(newDate, this.props)
      : newDate
    this.setState({
      value: newValue
    })

    if (onChange && newDateIsValid) {
      onChange(newValue)
    }
  }

  render() {
    const {
      classes,
      className,
      iconClassName,
      aboveLabelClassName,
      guid,
      readOnly
    } = this.props

    const {
      name,
      displayName,
      locale,
      variant,
      format,
      withTime,
      displayNamePosition,
      hasError,
      disableAutoComplete,
      minDate,
      maxDate
    } = this.props

    const { value } = this.state

    return (
      <React.Fragment>
        {displayNamePosition === InputLabelDisplayModeAbove && (
          <FormLabel
            htmlFor={guid}
            error={hasError}
            className={aboveLabelClassName}
          >
            {`${displayName}:`}
          </FormLabel>
        )}
        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
          {!withTime && (
            <KeyboardDatePicker
              className={clsx(classes.root, className)}
              id={guid}
              fullWidth
              onChange={this.onChange}
              value={DateTimePicker.addOffset(value, this.props)}
              name={disableAutoComplete ? guid : name}
              error={hasError}
              label={
                displayNamePosition === InputLabelDisplayModeInside
                  ? displayName
                  : undefined
              }
              inputVariant={variant}
              format={format}
              disabled={readOnly}
              minDate={minDate}
              maxDate={maxDate}
              KeyboardButtonProps={{
                className: iconClassName
              }}
              // invalidDateMessage={I18n.t(
              //   'component.date_time_field.invalid_date'
              // )}
              // maxDateMessage={I18n.t('component.date_time_field.too_big_date', {
              //   date: moment.utc(maxDate).format('DD.MM.YYYY')
              // })}
              // minDateMessage={I18n.t(
              //   'component.date_time_field.too_small_date',
              //   { date: moment.utc(minDate).format('DD.MM.YYYY') }
              // )}
              // okLabel={I18n.t('action.ok')}
              // todayLabel={I18n.t('shared.today')}
              // clearLabel={I18n.t('action.clear')}
              // cancelLabel={I18n.t('action.cancel')}
            />
          )}
          {/* <KeyboardDateTimePicker  /> */}
        </MuiPickersUtilsProvider>
      </React.Fragment>
    )
  }

  static addOffset(value, props) {
    if (!value) {
      return value
    }

    const {
      withTime,
      utcOffset,
      serverDateFormat,
      serverDateTimeFormat
    } = props

    if (!withTime) {
      return moment(value).format(serverDateFormat)
    }
    let dateValue = moment.utc(value)
    dateValue = dateValue.hours(dateValue.hours() + utcOffset)

    return dateValue.format(serverDateTimeFormat)
  }

  static subtractOffset(value, props) {
    if (!value) {
      return value
    }

    const {
      withTime,
      utcOffset,
      serverDateFormat,
      serverDateTimeFormat
    } = props

    if (!withTime) {
      return value.format(serverDateFormat)
    }

    const dateValue = value.hours(value.hours() - utcOffset)
    return dateValue.format(serverDateTimeFormat)
  }
}

DateTimePicker.propTypes = {
  variant: PropTypes.oneOf([
    InputVariantStandard,
    InputVariantOutlined,
    InputVariantFilled
  ]),
  displayNamePosition: PropTypes.oneOf([
    InputLabelDisplayModeAbove,
    InputLabelDisplayModeInside
  ]),
  readOnly: PropTypes.bool,
  utcOffset: PropTypes.number,
  withTime: PropTypes.bool,
  format: PropTypes.string,
  serverDateFormat: PropTypes.string,
  serverDateTimeFormat: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string
}

DateTimePicker.defaultProps = {
  locale: 'en',
  variant: InputVariantOutlined,
  displayNamePosition: InputLabelDisplayModeInside,
  underline: true,
  readOnly: false,

  utcOffset: 0,
  withTime: false,
  format: 'DD.MM.YYYY',
  serverDateFormat: 'YYYY-MM-DD',
  serverDateTimeFormat: 'YYYY-MM-DDTHH:mm:ss',
  minDate: '1900-01-01',
  maxDate: '2100-12-31'
}

export default compose(
  withGuid,
  withHelperText,
  withStyles(styles)
)(DateTimePicker)
