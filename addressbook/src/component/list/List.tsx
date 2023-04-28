import React from "react";
import { HighlightSpanKind } from "typescript";
import { Person } from "../../model/Person";
import "./List.scss"

interface ListProps {
    data: Person
}

interface ListState {

}

class List extends React.Component<ListProps, ListState> {
    // state = { :  }
    render() {
        return (
            <>
                <section className="list-component">
                    <div>
                        <span className="card-heading">{this.props.data.name}</span>
                        <footer className="footer">
                            <span>{this.props.data.email}</span>
                            <span>{this.props.data.mobile}</span>
                        </footer>
                    </div>
                </section>
            </>
        );
    }
}

export default List;