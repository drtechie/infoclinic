import {Link} from "react-router-dom";
import React from "react";

export function buildMenu(menuItems) {
    if (menuItems) {
        return menuItems.map((item, i) => {
            return (
                <li key={item.ID} >
                    <Link to={item.url}>{item.title}</Link>
                </li>
            );
        })
    }

    return null;
}