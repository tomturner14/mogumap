import styles from "./page.module.scss";

const middleAreas = [
  { code: "Y115", name: "千葉・稲毛" },
  { code: "Y128", name: "海浜幕張" },
  { code: "Y120", name: "船橋・津田沼・市川・本八幡・中山" },
  { code: "Y125", name: "柏・南柏・我孫子" },
  { code: "Y690", name: "松戸・新松戸" },
  { code: "Y126", name: "舞浜・浦安・行徳・妙典" },
  { code: "Y129", name: "蘇我・鎌取・茂原" },
  { code: "Y127", name: "成田・佐倉" },
  { code: "Y859", name: "木更津・市原" },
  { code: "Y858", name: "銚子・旭" },
  { code: "Y121", name: "南房総・館山" },
  { code: "Y122", name: "千葉県その他" },
];

type HomeProps = {
  searchParams: Promise<{
    middleArea?: string | string[];
    keyword?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const selectedMiddleArea =
    typeof params.middleArea === "string" ? params.middleArea : "";

  const keyword = typeof params.keyword === "string" ? params.keyword : "";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>MoguMap</h1>
          <p>千葉県内の飲食店を、中エリアとキーワードで検索できます。</p>

          <form className={styles.form}>
            <label htmlFor="middle-area">中エリア</label>

            <select
              id="middle-area"
              name="middleArea"
              defaultValue={selectedMiddleArea}
              required
            >
              <option value="" disabled>
                中エリアを選択してください
              </option>
              {middleAreas.map((area) => (
                <option key={area.code} value={area.code}>
                  {area.name}
                </option>
              ))}
            </select>

            <label htmlFor="keyword">キーワード</label>
            <input
              id="keyword"
              name="keyword"
              type="search"
              placeholder="店名や料理名を入力してください"
              defaultValue={keyword}
            />

            <button type="submit">検索する</button>
          </form>
        </div>
      </main>
    </div>
  );
}
