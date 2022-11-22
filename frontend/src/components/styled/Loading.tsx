import styled from "styled-components";
import LoadingGif from "../../assets/img/loading.gif";

interface LoadingProps {
  variant: "small" | "big"
}

export const Loading = ({ variant }: LoadingProps) => {
    const height = (variant==='small' && "24px") || (variant==='big' && "48px") 
    return (
        <img src={LoadingGif} alt="Processing..." style={{height:`${height}`}}/>
    )
};

