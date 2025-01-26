import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const TreemapComponent = ({ data }: { data: any[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const height = 924;

  const tile = (node: any, x0: number, y0: number, x1: number, y1: number) => {
    d3.treemapBinary(node, 0, 0, width, height);
    for (const child of node.children) {
      child.x0 = x0 + (child.x0 / width) * (x1 - x0);
      child.x1 = x0 + (child.x1 / width) * (x1 - x0);
      child.y0 = y0 + (child.y0 / height) * (y1 - y0);
      child.y1 = y0 + (child.y1 / height) * (y1 - y0);
    }
  };

  useEffect(() => {
    const dataTransformed = transformUtxosToTreemapData(data);

    const svg = d3.select(svgRef.current);
    const format = d3.format(",d");
    const name = (d: any) =>
      d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join("/");

    const hierarchy = d3
      .hierarchy(dataTransformed)
      .sum((d) => Math.sqrt((d as any).value))
      .sort((a, b) => (b as any).value - (a as any).value) as any;

    const root = d3.treemap().tile(tile)(hierarchy);

    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([0, height]);

    const render = (group: any, root: any) => {
      const node = group
        .selectAll("g")
        .data(root.children.concat(root))
        .join("g");

      node
        .filter((d) => (d === root ? d.parent : d.children))
        .attr("cursor", "pointer")
        .on("click", (event, d) => (d === root ? zoomout(d) : zoomin(d)));

      node.append("title").text((d) => `${name(d)}\n${format(d.value)}`);

      node
        .append("rect")
        .attr("fill", (d) =>
          d === root ? "#fff" : d.children ? "#ccc" : "#ddd"
        )
        .attr("stroke", "#fff");

      node
        .append("text")
        .attr("fill", "black")
        .attr("font-weight", (d) => (d === root ? "bold" : null))
        .selectAll("tspan")
        .data((d) =>
          (d === root ? name(d) : d.data.name).split(/(?=[A-Z][^A-Z])/g)
        )
        .join("tspan")
        .attr("x", 5)
        .attr("y", (d, i, nodes) => {
          // Ensure that 'i' and 'nodes.length' are treated as numbers
          return `${Number(i === nodes.length - 1) * 0.5 + 1.1 + i * 0.9}em`;
        })

        .attr("font-weight", (d, i, nodes) =>
          i === nodes.length - 1 ? "bold" : null
        )
        .text((d) => d);

      group.call(position, root);
    };

    const position = (group: any, root: any) => {
      group
        .selectAll("g")
        .attr("transform", (d) =>
          d === root ? `translate(0,-30)` : `translate(${x(d.x0)},${y(d.y0)})`
        )
        .select("rect")
        .attr("width", (d) => (d === root ? width : x(d.x1) - x(d.x0)))
        .attr("height", (d) => (d === root ? 30 : y(d.y1) - y(d.y0)))
        .attr("fill", (d) =>
          d.data.value === 546
            ? "#ff7875"
            : d.data.value >= 9500
            ? "#9ee59e"
            : "#e3e3e3"
        );
    };

    let group = svg.append("g").call(render, root);

    const zoomin = (d: any) => {
      const group0 = group.attr("pointer-events", "none");
      const group1: any = (group = svg.append("g").call(render, d));

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg
        .transition()
        .duration(750)
        .call((t: any) =>
          group0.transition(t).remove().call(position, d.parent)
        )
        .call((t: any) =>
          group1
            .transition(t)
            .attrTween("opacity", () => d3.interpolate(0, 1))
            .call(position, d)
        );
    };

    const zoomout = (d: any) => {
      const group0: any = group.attr("pointer-events", "none");
      const group1 = (group = svg.insert("g", "*").call(render, d.parent));

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      svg
        .transition()
        .duration(750)
        .call((t: any) =>
          group0
            .transition(t)
            .remove()
            .attrTween("opacity", () => d3.interpolate(1, 0))
            .call(position, d)
        )
        .call((t: any) => group1.transition(t).call(position, d.parent));
    };
  }, [data, width]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0.5 -30.5 ${width} ${height + 30}`}
      width={width}
      height={height + 30}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
};

export default TreemapComponent;

const transformUtxosToTreemapData = (utxos: any[]) => {
  const format = d3.format(",d");
  return {
    name: "",
    children: utxos.map((utxo) => ({
      value: utxo.value,
      name: `${format(utxo.value)} sats - ${utxo.value / 10 ** 8} BTC`,
      children: [
        {
          name: `\n\nTxid: ${utxo.txid}...\nValue: ${Number(
            utxo.value
          )} sats\nVout: ${utxo.vout}\nConfirmed: ${
            utxo.status.confirmed
          }\nBlock Height: ${utxo.status.block_height}\nBlock Hash: ${
            utxo.status.block_hash
          }...\nBlock Time: ${new Date(
            utxo.status.block_time * 1000
          ).toLocaleString()}`,
        },
      ],
    })),
  };
};
