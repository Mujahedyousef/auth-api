"use strict";
module.exports = (req, res) => {
    res.satus(404).json({
        code: 404,
        message: `the page is not found please make sure from the path. `
    })
}