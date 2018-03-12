import React, { Component } from 'react'
import JSONTree from 'react-json-tree'
import { TableRow, TableCell, Text, ContextMenu, Countdown } from '@aragon/ui'
import { Icon } from 'semantic-ui-react'

import { jsonTheme } from '../../colors'
import { CMItem } from 'components/StyledHome'
import { dateHasPassed } from 'utils/_datetime'
import { baseToConvertedUnit } from 'utils/_units'

export default class ListingRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
    }
  }

  handleToggleExpandDetails = listingHash => {
    this.setState(prevState => ({
      expand: !prevState.expand,
    }))
  }

  render() {
    return (
      <TableRow key={this.props.listingHash}>
        <TableCell onClick={this.handleToggleExpandDetails}>
          <Text>{this.props.listing.get('ipfsID')}</Text>
        </TableCell>
        <TableCell onClick={this.handleToggleExpandDetails}>
          {this.props.listingType === 'candidates' &&
            (!dateHasPassed(this.props.listing.getIn(['appExpiry', 'date'])) ? (
              <Countdown
                end={this.props.listing.getIn(['appExpiry', 'date'])}
              />
            ) : (
              'Ready to update'
            ))}

          {this.props.listingType === 'faceoffs' &&
            (!dateHasPassed(
              this.props.listing.getIn(['latest', 'commitEndDate'])
            ) ? (
              <Countdown
                end={this.props.listing.getIn([
                  'latest',
                  'commitExpiry',
                  'date',
                ])}
              />
            ) : !dateHasPassed(
              this.props.listing.getIn(['latest', 'revealEndDate'])
            ) ? (
              <Countdown
                end={this.props.listing.getIn([
                  'latest',
                  'revealExpiry',
                  'date',
                ])}
              />
            ) : (
              false
            ))}
        </TableCell>
        {this.state.expand ? (
          <TableCell>
            <JSONTree
              invertTheme={false}
              theme={jsonTheme}
              data={this.props.listing}
              keyName={'root'}
              level={0}
            />
          </TableCell>
        ) : (
          <TableCell onClick={this.handleToggleExpandDetails}>
            {'click to expand'}
          </TableCell>
        )}
        <TableCell onClick={this.handleToggleExpandDetails}>
          {this.props.listingType === 'candidates'
            ? baseToConvertedUnit(
                this.props.parameters.get('minDeposit'),
                this.props.contracts.get('tokenDecimals')
              )
            : false}
        </TableCell>
        <TableCell onClick={this.handleToggleExpandDetails}>
          <div>
            <Icon name="exclamation circle" size="large" color="yellow" />
            {this.props.listing.get('owner') === this.props.account && (
              <Icon name="check circle" size="large" color="blue" />
            )}
          </div>
        </TableCell>

        {/* actions */}
        <TableCell>
          <ContextMenu>
            {this.props.listing.getIn(['latest', 'appExpired']) && (
              <CMItem
                onClick={e =>
                  this.props.handleSendTransaction(
                    'updateStatus',
                    this.props.listing
                  )
                }
              >
                <Icon name="magic" size="large" color="purple" />
                {'Update Status'}
              </CMItem>
            )}
            <CMItem
              onClick={this.props.openSidePanel}
            >
              <Icon name="exclamation circle" size="large" color="red" />
              {this.props.copy}
            </CMItem>
          </ContextMenu>
        </TableCell>
      </TableRow>
    )
  }
}
