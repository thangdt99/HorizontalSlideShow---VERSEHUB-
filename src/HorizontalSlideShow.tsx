import React from "react";
import "./style.css";
import { Avatar } from "antd";
interface Image {
  id?: string;
  url: string;
  name: string;
}
function dataImage() {
  const data: Image[] = [];
  for (let i = 1; i < 7; i++) {
    data.push({ name: `Item ${i}`, id: `${i}`, url: `image${i}.jpg` });
  }
  return data;
}

const HorizontalSdivdeShow: React.FC<{
  marginLR?: number;
  sizeMax?: number;
  stepSize?: number;
  numberItemDisplay?: number;
}> = (props) => {
  const [value, setValue] = React.useState<Image>({
    name: "Item 3",
    id: "3",
    url: "image3.jpg",
  }); //
  const as = window.innerWidth;
  const numberItemDisplay = props.numberItemDisplay || 3;
  let marginLR = props.marginLR || 15;
  let sizeMax = props.sizeMax || 100;
  let stepSize = props.stepSize || 20;
  const [index, setIndex] = React.useState<number>(2);
  const [data, setData] = React.useState<Image[]>(dataImage());
  let width = marginLR * (numberItemDisplay * 2 - 1) * 2;
  for (let i = 0; i < numberItemDisplay; i++) {
    width = width + (sizeMax - stepSize * i) * (i === 0 ? 1 : 2);
  }
  if (window.innerWidth < width) {
    const b = width / (window.innerWidth - 30);
    marginLR = marginLR / b;
    sizeMax = sizeMax / b;
    stepSize = stepSize / b;
    width = width / b;
  }
  const itemEmpty: JSX.Element[] = [];
  const numberItemEmpty = numberItemDisplay - index - 1;
  if (numberItemEmpty > 0) {
    for (let i = 1; i <= numberItemEmpty; i++) {
      itemEmpty.push(
        <div
          className="li"
          style={{
            margin: `0 ${marginLR}px`,
            width: sizeMax - (numberItemEmpty - i) * stepSize,
            height: sizeMax - (numberItemEmpty - i) * stepSize,
          }}
        ></div>
      );
    }
  }
  return (
    <>
      <div
        className={"ant-carousel"}
        style={{ margin: "10px 0", height: `${sizeMax}` }}
      >
        <div
          className={"button-slick"}
          style={{ marginRight: index === 0 ? "15px" : "" }}
        >
          <button
            className="slick-prev slick-arrow"
            aria-label="Previous"
            type="button"
            style={{ display: index === 0 ? "none" : "" }}
            onClick={() => {
              const prevIndex = index === 0 ? index : index - 1;
              const prevValue = data[prevIndex];
              setIndex(prevIndex);
              setValue(prevValue);
            }}
          ></button>
        </div>
        <div className="slick-dots" style={{ width: width }}>
          {itemEmpty}
          {data.map((item, i) => {
            const size =
              Math.abs(i - index) < numberItemDisplay
                ? sizeMax - Math.abs(i - index) * stepSize
                : 0;
            return (
              <div
                className="li"
                style={{
                  margin: `0 ${marginLR}px`,
                  display: !size ? "none" : "",
                }}
              >
                <Avatar
                  onClick={() => {
                    setValue(item);
                    setIndex(i);
                  }}
                  size={size}
                  icon={item.id}
                  style={{ border: "3px solid #000000a6", cursor: "pointer" }}
                />
              </div>
            );
          })}
        </div>
        <div
          className={"button-slick"}
          style={{ marginRight: index === data.length - 1 ? "15px" : "" }}
        >
          <button
            className="slick-next slick-arrow"
            aria-label="Next"
            type="button"
            style={{ display: index === data.length - 1 ? "none" : "" }}
            onClick={() => {
              const nextIndex = index === data.length - 1 ? index : index + 1;
              const nextValue = data[nextIndex];
              setIndex(nextIndex);
              setValue(nextValue);
            }}
          ></button>
        </div>
      </div>
      <div style={{ width: "200px" }}>
        <div className="title-list">
          <span style={{ padding: "5 0px", display: "block" }}>
            {value.name}
          </span>
        </div>
        <div className="body-list">
          <div>
            {Object.keys(value).map((key) => (
              <p>{`${key} : ${value[key as keyof Image]}`}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalSdivdeShow;
