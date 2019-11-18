import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby';
import PropTypes from 'prop-types'
import Img from "gatsby-image";

import { SeriesDictionary } from '../../../utils/seriesdictionary'

const _ = require("lodash")

const SeriesListing = styled.div `
    margin-top: 1em;
    border-bottom: 1px solid lightgray;
    padding-bottom: 1em;

    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    @media (min-width:768px) {
        justify-content: flex-start;
        
        p {
            margin-bottom: 0px;
        }
    }
`

const SeriesThumbnail = styled.div `
    flex: 0 0 200px;
    box-shadow: 2px 2px #ccc;
    overflow:hidden;
`

const SeriesDetails = styled.div `
    padding: 1em;

    flex: 1 0 100%;
    display: flex;
    flex-direction: column;

    @media (min-width:768px) {
        flex: 1 0 50%;
    }
`

const SeriesTitle = styled.h3 `
`

const SeriesDescription = styled.div `
`
const SeriesDate = styled.span `
    font-size:small;
`

const SeriesLink = styled(Link) `
    margin: 2px;
    padding:5px;
    background-color: f0f8ff;
    font-weight: bold;
`

const SeriesItem = ({ title, date, img, postCount}) => (
    <SeriesListing>
        <SeriesThumbnail>
            <Img fluid={ img }/>
        </SeriesThumbnail>
        <SeriesDetails>
            <SeriesTitle>{ _.upperFirst(title) }</SeriesTitle>
            <SeriesDate>{ date }</SeriesDate>
            <SeriesDescription>{ SeriesDictionary.get(title) }</SeriesDescription>
            <SeriesLink to={ `/series/${_.kebabCase(title)}/` }>{ "View All " + postCount + " Posts" }</SeriesLink>
        </SeriesDetails>
    </SeriesListing>
)

export { SeriesItem }

SeriesItem.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    postCount: PropTypes.number,
    img: PropTypes.any
}