import React, { Component } from 'react';

class SearchBar extends Component {

    handleChange = (event) => {
        this.setState({
            term:event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleFormSubmit(this.state.term)
    }
    render() {
        return (
            <>
                <div className="searchbaruisegment">
                    <form onSubmit={this.handleSubmit} className="ui form">
                        <div className="field">
                            <label htmlFor="video-search"> Video Search </label>
                            <input onChange={this.handleChange} name="video-search" type="text" placeholder="Search .." />
                        </div>
                    </form>
                </div>
            </>
            )
    }
}
export default SearchBar