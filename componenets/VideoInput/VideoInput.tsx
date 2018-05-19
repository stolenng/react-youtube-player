import * as React from "react";

import IVideoInput from './IVideoInput';

type State = {
    value: string;
    class: string;
};

export default class VideoInputComponent extends React.Component<IVideoInput, State> {
    state: State = {
        value: '',
        class: ''
    };

    constructor(props: IVideoInput) {
        super(props);
    }

    handleChange = (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLInputElement;

        this.setState({value: target.value, class: '' });
    }
    
    handleSubmit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        
        if (this.validate(this.state.value) && this.extractId(this.state.value)) {
            const id = this.extractId(this.state.value);
           
            this.props.onSubmit(id);
            this.reset();    
        }
        else {
            this.setState({value: this.state.value, class: 'error' });            
        }
    }

    reset() {
        this.setState({ value: '', class: '' });
    }
    
    validate(url: string): boolean {
        if (!url) {
            return false;
        }

        const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;     

        return regex.test(url);
    }

    getClass() : string {
        if (this.state.value) {
            return '';
        }

        return this.validate(this.state.value) ? '' : 'error'; 
    }

    extractId(url: string): string {
        const regex = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const result = url.match(regex);

        if (!result) {
            return null;
        }

        return result[result.length-1];
    }
     
    render() {
        return (
            <div className="video-input">
                <form onSubmit={this.handleSubmit}>
                    <input className={`input ${this.state.class}`} type="text" onChange={this.handleChange} value={this.state.value} placeholder="Insert valid youtube url"/>
                    <button className="button" type="submit">Add</button>
                </form>
            </div>
        );
    }
}