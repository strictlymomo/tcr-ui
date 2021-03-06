import React from 'react'

import { MarginDiv } from 'views/components/StyledHome'

import { SideText } from './components'
import SidePanelSeparator from './components/SidePanelSeparator'
import SidePanel from './components/SidePanel'

export default ({ opened, closeSidePanel, tcr, handleInputChange }) => (
  <div>
    <SidePanel title="Start an Application" opened={opened} onClose={closeSidePanel}>
      <SidePanelSeparator />

      <MarginDiv>
        <SideText
          color="red"
          text={`You must have ${tcr.get('tokenName')} to participate in this TCR`}
        />
      </MarginDiv>

      <SidePanelSeparator />
    </SidePanel>
  </div>
)
