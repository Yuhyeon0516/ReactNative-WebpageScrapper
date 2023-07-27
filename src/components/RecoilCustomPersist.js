import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import { getItem } from "../util/AsyncStorageUtils";

export function RecoilCustomPersist({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const setList = useSetRecoilState(atomLinkList);

  const loadData = useCallback(async () => {
    const data = await getItem("MAIN/LINK_LIST");

    if (data) {
      setList(JSON.parse(data));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) return;

    loadData();
  }, []);

  return <>{isLoaded && children}</>;
}
