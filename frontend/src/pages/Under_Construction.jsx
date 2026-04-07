import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../css/styles_error.css';

function UnderConstruction({ title }) {
    return (
        <div className="dashboard-body">
            <input type="checkbox" id="menu-toggle"/>
            <Header />
            <Sidebar/>
            <label htmlFor="menu-toggle" className="menu-overlay"></label>

            <main className="dashboard-content uc-fullscreen-main">
                <div className="uc-content-aligner">
                    <div className="construction-card dark-theme">
                        <div className="construction-icon">
                            <i className="fa-solid fa-pen-ruler"></i>
                        </div>
                        <h2>{title || "Tato sekce se připravuje"}</h2>
                        <p>Tady se právě taktizuje v šatně. Na této funkci usilovně pracujeme, aby byla brzy připravena k výkopu!</p>

                        <div className="tactical-board-square">
                            <div className="tactical-board-lines"></div>

                            <div className="magnet x x1">X</div>
                            <div className="magnet x x2">X</div>
                            <div className="magnet x x3">X</div>
                            <div className="magnet x x4">X</div>


                            <div className="magnet o o1">O</div>
                            <div className="magnet o o2">O</div>

                            <div className="tactical-ball">⚽</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UnderConstruction;