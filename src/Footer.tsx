import { Link } from "react-router-dom";
import races from "./data/races.json";
import { FunctionComponent } from "react";
import { Gender } from "./helpers";

type FooterProps = {
  race: string;
  gender: Gender;
};

const Footer: FunctionComponent<FooterProps> = ({ race, gender }) => (
  <tr>
    <td colSpan={16}>
      <Link className="cursor-pointer" to={`/${race}/male`}>
        male
      </Link>
      ,{" "}
      <Link className="cursor-pointer" to={`/${race}/female`}>
        female
      </Link>
      ,{" "}
      {races.map((_race, index) => (
        <span key={index}>
          <Link to={`/${_race}/${gender}`}>{_race}</Link>
          {`, `}
        </span>
      ))}
    </td>
  </tr>
);

export default Footer;
