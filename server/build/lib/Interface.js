import t from "flow-runtime";
function bar(x, y) {
    let _xType = t.string();

    let _yType = t.ref("integer");

    t.param("x", _xType).assert(x);
    t.param("y", _yType).assert(y);

    console.log(x);
}

t.annotate(bar, t.function(t.param("x", t.string()), t.param("y", t.ref("integer"))));
bar(10, 20);