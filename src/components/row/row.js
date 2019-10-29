import React from 'react'

import './row.css'

const Row = ({firstWidget, secondWidget}) => {
	return (
			<div className="row mb-4">
                <div className="col-md-6">
                	{firstWidget}
                </div>
                <div className="col-md-6">
                	{secondWidget}
                </div>
            </div>
	)
}

export default Row