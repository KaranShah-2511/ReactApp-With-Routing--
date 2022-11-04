import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { AdminService, Count, PostUserCount, SearchParam, ViewLikeCount } from "../../Services/AdminServices";
import Chart from "react-apexcharts";
import './DashBoard.scss'

function DashBoard() {

    const year: any = (new Date()).getFullYear();
    const [data, setData] = useState<Count>();
    const adminServices = new AdminService();
    const [yearData, setYearData] = useState(year);
    const [totalUser, setTotalUser] = useState<any>(0);
    const [totalPost, setTotalPost] = useState<any>(0);
    const [totalReports, setTotalReports] = useState<any>(0);
    const [userPostCount, setUserPostCount] = useState<PostUserCount>()
    const [viewLikeCount, setViewLikeCount] = useState<ViewLikeCount>()
    const options: any = [];
    for (let i = 0; i <= 10; i++) {
        const years = year - i;
        options.push(<option value={years}>{years}</option>);
    }

    const param: SearchParam = {
        year: yearData
    }
    useEffect(() => {
        adminServices.getPostUserReportCount(param).then((res) => {
            setTotalUser(0)
            setTotalPost(0)
            setTotalReports(0)
            setData(res);
            userTotal(res)
        });
        adminServices.getpostcount().then((res) => {
            setUserPostCount(res);
        })
        adminServices.getviewlikecount().then((res) => {
            setViewLikeCount(res);
        })

    }, [yearData]);

    const userTotal = (value: Count) => {
        if (value.user.length && value.reportData.length && value.post.length) {
            for (let i = 0; i < 12; i++) {
                setTotalUser((prevValues) => {
                    return prevValues = prevValues + value.user[i]
                });
                setTotalPost((prevValues) => {
                    return prevValues = prevValues + value.post[i]
                });
                setTotalReports((prevValues) => {
                    return prevValues = prevValues + value.reportData[i]
                });
            }
        }
    };



    const state: any = {
        series: [
            {
                name: "Users",
                data: data?.user
            },
            {
                name: "Posts",
                data: data?.post
            },
            {
                name: "Reports",
                data: data?.reportData
            }
        ],
        options: {
            chart: {
                height: 350,
                type: "area",
                foreColor: '#fff'
            },
            dataLabels: {
                enabled: true
            },
            stroke: {
                curve: "smooth"
            },
            xaxis: {
                type: "month",
                categories: [`Jan ${yearData}`, `Feb ${yearData}`, `March ${yearData}`, `April ${yearData}`, `May ${yearData}`, `June ${yearData}`, `July ${yearData}`, `Aug ${yearData}`, `Sep ${yearData}`, `Oct ${yearData}`, `Nov ${yearData}`, `Dec ${yearData}`]
            },

        }
    };

    const barstate: any = {
        options: {
            chart: {
                id: "basic-bar",
                foreColor: '#fff'
            },
            xaxis: {
                categories: userPostCount?.user
            }
        },
        series: [
            {
                name: "Post Count",
                data: userPostCount?.count
            }
        ]
    };

    const apexOpts: any = {

        chart: {
            height: 450,
            type: "bar",
            foreColor: '#fff'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: "top"
                }
            }
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: "12px",
                colors: ["#fff"]
            }
        },


        colors: ["#0acf97", "red"],
        xaxis: {
            categories: viewLikeCount?.user,
            labels: {
                show: true
            },
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            }
        },
        // yaxis: {
        //     show: true,
        //     seriesName: [12, 121, 1233, 1213, 131],
        //     showAlways: true,
        //     labels: {
        //         show: true
        //     },
        //     title: {
        //         text: "Count"
        //     }
        // },

        fill: {
            type: "gradient",
            gradient: {
                inverseColors: !0,
                shade: "light",
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: void 0,
                opacityFrom: 1,
                opacityTo: 1
            }
        }
    };
    const apexData :any= [
        {
            name: "Likes",
            data: viewLikeCount?.likeCount
        },
        {
            name: "Views",
            data: viewLikeCount?.viewCount
        }
    ];

    const handleyear = (e) => {
        setYearData(e.target.value)
    }

    return (
        <div className="admin-dashboard">
            <div className="chart-div">
                <form >
                    <label >Choose a year:</label>
                    <select onChange={handleyear}>
                        {options}
                    </select>
                    <br></br>

                </form>
                <div className="count-div">
                    <div className="user-count">
                        <h3>Total Users</h3>
                        <h1>{totalUser}</h1>
                    </div>
                    <div className="post-count">
                        <h3>Total Posts</h3>
                        <h1>{totalPost}</h1>
                    </div>
                    <div className="report-count">
                        <h3>Total Reports</h3>
                        <h1>{totalReports}</h1>
                    </div>
                </div>

                <div id="chart" >
                    <ReactApexChart
                        options={state.options}
                        series={state.series}
                        type="area"
                        height={350}
                    />
                    <br></br>
                    <br></br>
                    <br></br>
                    <div className="bargraphs">
                        <h1 style={{ color: "white", paddingTop: "35px" }}>User and their Post Count</h1>
                        <Chart
                            options={barstate.options}
                            series={barstate.series}
                            type="bar"
                            width="500"
                        />

                    </div>

                    <h1 style={{ color: "white", paddingTop: "35px" }}>Like View Total Count</h1>
                    <Chart
                        options={apexOpts}
                        series={apexData}
                        type="bar"
                        height={500}
                        className="apex-charts mt-2"
                    />

                </div>


            </div>
        </div>


    );

}

export default DashBoard;