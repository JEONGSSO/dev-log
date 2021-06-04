const List = ({ list }) => {
  const generateDom = useMemo(() => {
    let dom = [];

    for (let [key, data] of list.entries()) {
      dom.push(<Box key={key} data={data} />);
    }

    return dom;
  }, [list]);

  return (
    <Wrap>
      <div>{generateDom}</div>
    </Wrap>
  );
};

const Box = () => {
  const [active, setActive] = useState(true);
  // 이렇게 useState를 넣으면 Box 컴포넌트마다 각각 state가 적용된다.
};
