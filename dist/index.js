

function ___$insertStyle(css) {
    if (!css || typeof window === 'undefined') {
        return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.innerHTML = css;
    document.head.appendChild(style);
    return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reactPopper = require('react-popper');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function FeedbackModal(props) {
    var _a = React__namespace.useState(""), feedback = _a[0], setFeedback = _a[1];
    var _b = React__namespace.useState(false), showSpinner = _b[0], setShowSpinner = _b[1];
    var _c = React__namespace.useState("Give feedback!"), modalTitle = _c[0], setModalTitle = _c[1];
    var _d = React__namespace.useState("Send Feedback"), feedbackButtonText = _d[0], setFeedbackButtonText = _d[1];
    var _e = React__namespace.useState("ask"), state = _e[0], setState = _e[1];
    function handleSubmitFeedback() {
        if (state === "conclusion") {
            setFeedback("");
            setShowSpinner(false);
            setState("ask");
            setModalTitle("Give feedback!");
            setFeedbackButtonText("Send Feedback");
            return;
        }
        if (!feedback) {
            return;
        }
        setShowSpinner(true);
        setState("conclusion");
        setModalTitle("Thank you!");
        setFeedbackButtonText("Another thing to say?");
        setShowSpinner(false);
    }
    function handleKeyDown(event) {
        if (event.key === "Enter" && event.metaKey) {
            handleSubmitFeedback();
        }
    }
    var spin = "   \n       100% { -moz-transform: rotate(360deg); } \n       100% { -webkit-transform: rotate(360deg); } \n       100% { \n           -webkit-transform: rotate(360deg); \n           transform:rotate(360deg); \n       } \n   }\n   ";
    return (React__namespace.createElement("div", { style: {
            width: 300,
            minHeight: 150,
            backgroundColor: "white",
            borderRadius: 7,
            boxShadow: "rgb(0 0 0 / 27%) 5px 5px 15px 0px",
            display: "flex",
            zIndex: 9999,
            padding: 10,
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "helvetica, arial",
        } },
        React__namespace.createElement("div", { style: {
                width: "100%",
                display: "flex",
                fontWeight: "bold",
                justifyContent: "space-between",
                alignItems: "center",
            } },
            React__namespace.createElement("p", { style: { margin: 0, color: "black" } }, modalTitle),
            React__namespace.createElement("button", { style: {
                    width: 20,
                    height: 20,
                    background: "none",
                    padding: 0,
                    border: 0,
                    cursor: "pointer",
                }, onClick: props.onClose },
                React__namespace.createElement("svg", { width: "12px", height: "12px", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                    React__namespace.createElement("path", { id: "Path", d: "M19.773 16.809 L12.94 9.953 19.789 3.186 C20.07 2.905 20.07 2.447 19.789 2.166 L17.841 0.208 C17.706 0.073 17.523 0 17.331 0 17.138 0 16.956 0.078 16.82 0.208 L10.003 6.955 3.174 0.213 C3.039 0.078 2.857 0.005 2.664 0.005 2.471 0.005 2.289 0.083 2.154 0.213 L0.211 2.171 C-0.07 2.452 -0.07 2.91 0.211 3.191 L7.06 9.958 0.232 16.809 C0.096 16.944 0.018 17.126 0.018 17.319 0.018 17.512 0.091 17.694 0.232 17.829 L2.18 19.787 C2.32 19.927 2.503 20 2.69 20 2.872 20 3.06 19.932 3.201 19.787 L10.003 12.957 16.81 19.781 C16.951 19.922 17.133 19.995 17.32 19.995 17.503 19.995 17.69 19.927 17.831 19.781 L19.779 17.824 C19.914 17.689 19.992 17.507 19.992 17.314 19.987 17.126 19.909 16.944 19.773 16.809 Z", fill: "#aeaeae", stroke: "none" })))),
        state === "ask" && (React__namespace.createElement("textarea", { autoFocus: true, placeholder: "I really ...", style: {
                marginTop: 12,
                borderRadius: 7,
                fontSize: 14,
                resize: "none",
                height: 55,
                color: "black",
                backgroundColor: "white",
                borderColor: "rgba(51,51,51,0.2)",
                wordBreak: "break-word",
                padding: 10,
                fontFamily: "helvetica, arial",
            }, onKeyDown: handleKeyDown, onChange: function (e) { return setFeedback(e.target.value); } })),
        state === "conclusion" && (React__namespace.createElement("p", { style: {
                marginTop: 16,
                marginBottom: 16,
                color: "black",
                textAlign: "left",
            } }, "Your feedback has been received!")),
        React__namespace.createElement("div", { style: { display: "flex", flexDirection: "column" } },
            React__namespace.createElement("button", { style: {
                    cursor: "pointer",
                    backgroundColor: !feedback
                        ? "rgba(51,51,51,0.2)"
                        : "rgb(13, 166, 125)",
                    borderRadius: 7,
                    marginTop: 16,
                    padding: 6,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "helvetica, arial",
                    border: 0,
                    height: 35,
                }, onClick: handleSubmitFeedback },
                feedbackButtonText,
                showSpinner && (React__namespace.createElement("div", { style: {
                        paddingTop: 2,
                        paddingBottom: 2,
                        marginLeft: 10,
                    } },
                    React__namespace.createElement("div", { style: {
                            border: "10px solid #f3f3f3",
                            borderTop: "10px solid #0da67d",
                            borderRadius: "50%",
                            WebkitAnimation: spin + " 4s linear infinite",
                            animation: spin + " 4s linear infinite",
                        } })))),
            React__namespace.createElement("span", { style: {
                    fontSize: 12,
                    fontFamily: "helvetica, arial",
                    textAlign: "center",
                    marginTop: 12,
                    color: "rgb(174,174,174)",
                } },
                "Powered by",
                " ",
                React__namespace.createElement("a", { href: "https://feedback.farm", target: "_blank", style: { color: "rgb(13,166,125)", textDecoration: "none" } }, "feedback.farm")))));
}

// https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
function useOutsideAlerter(ref, onClose) {
    React__namespace.useEffect(function () {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
function FeedbackFarm(props) {
    var _a = React__namespace.useState(true), visible = _a[0], setVisibility = _a[1];
    var _b = React__namespace.useState(null), referenceRef = _b[0], setReferenceRef = _b[1];
    var _c = React__namespace.useState(null), popperRef = _c[0], setPopperRef = _c[1];
    var _d = reactPopper.usePopper(referenceRef, popperRef, {
        placement: "auto",
    }), styles = _d.styles, attributes = _d.attributes;
    var wrapperRef = React__namespace.useRef(null);
    useOutsideAlerter(wrapperRef, function () { return setVisibility(false); });
    return (React__namespace.createElement("div", { ref: wrapperRef },
        React__namespace.createElement("div", { 
            // @ts-ignore
            ref: setReferenceRef, onClick: function () { return setVisibility(true); }, style: { cursor: "pointer" } }, props.children),
        React__namespace.createElement("div", __assign({ ref: setPopperRef, style: styles.popper }, attributes.popper), visible && (React__namespace.createElement(FeedbackModal, { onClose: function () { return setVisibility(false); }, projectId: props.projectId, identifier: props.identifier })))));
}

exports["default"] = FeedbackFarm;
//# sourceMappingURL=index.js.map
