import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div `
    max-width: 1080px;
    margin: auto;
    padding: 2em;
`

const CurrentAnnouncements = styled.ul `
    list-style: none square;
`

const Announcement = styled.li `
    padding: 1em;
    margin: 1em;
    background:
        linear-gradient(
        to left, 
        rgba(16, 151, 230, 0) 0%,
        rgba(16, 151, 230, 0.75) 100%
        )
        left 
        bottom
        rgba(0,0,0,0)    
        no-repeat; 
    background-size:100% 1px;
`

const Announcements = () => (
        <Wrapper>
            <h1>What's new?</h1>
            <CurrentAnnouncements>
                <Announcement>Welcome to the new website.</Announcement>
                <Announcement>Another.</Announcement>
                <Announcement>And another.</Announcement>
            </CurrentAnnouncements>
        </Wrapper>
)

export { Announcements }