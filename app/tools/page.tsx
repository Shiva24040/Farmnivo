'use client';

import { useState } from 'react';
import {
  Calculator, LandPlot, Percent, Scale, Droplets, Sprout,
  DollarSign, Wrench, Grid, TrendingUp, HelpCircle, CheckCircle2
} from 'lucide-react';

export default function Tools() {
  // 1. Land Area Converter
  const [areaVal, setAreaVal] = useState('1');
  const [areaFrom, setAreaFrom] = useState('acres');

  const sqMeters = (() => {
    const val = Number(areaVal) || 0;
    switch (areaFrom) {
      case 'acres': return val * 4046.85642;
      case 'guntas': return val * 101.17141;
      case 'cents': return val * 40.46856;
      case 'bigha': return val * 2529.285;
      case 'hectares': return val * 10000;
      case 'sq_yards': return val * 0.836127;
      default: return val;
    }
  })();

  // 2. Seed Rate Calculator
  const [cropSeed, setCropSeed] = useState('paddy');
  const [seedArea, setSeedArea] = useState('2.5');
  const seedRates: Record<string, { rate: number; unit: string; desc: string }> = {
    paddy: { rate: 25, unit: 'kg/acre', desc: 'Direct seeding: 20–25 kg/acre, Nursery: 12–15 kg/acre' },
    cotton: { rate: 1.5, unit: 'kg/acre (2 packets)', desc: 'Bt Cotton: 1.5–2 kg/acre (approx 2 packets of 450g)' },
    chilli: { rate: 0.15, unit: 'kg/acre (seedlings)', desc: 'Hybrid nursery: 120–150 grams/acre' },
    maize: { rate: 8, unit: 'kg/acre', desc: 'Single cross hybrids: 7.5–8.5 kg/acre' },
    tomato: { rate: 0.08, unit: 'kg/acre', desc: 'Hybrid nursery: 60–80 grams/acre' },
    groundnut: { rate: 45, unit: 'kg/acre kernels', desc: 'Bunch varieties: 40–45 kg/acre shelled pods' },
  };
  const totalSeedNeeded = (Number(seedArea) || 0) * (seedRates[cropSeed]?.rate || 20);

  // 3. Fertilizer / NPK Calculator
  const [npkArea, setNpkArea] = useState('2');
  const [reqN, setReqN] = useState('48'); // kg N / acre for paddy
  const [reqP, setReqP] = useState('24'); // kg P2O5 / acre
  const [reqK, setReqK] = useState('20'); // kg K2O / acre
  // Urea = 46% N, DAP = 18% N + 46% P2O5, MOP = 60% K2O
  const dapBags = Math.ceil(((Number(reqP) || 0) / 0.46) / 50 * (Number(npkArea) || 1));
  const nFromDap = (dapBags * 50 * 0.18) / (Number(npkArea) || 1);
  const remN = Math.max(0, (Number(reqN) || 0) - nFromDap);
  const ureaBags = Math.ceil(((remN / 0.46) / 50) * (Number(npkArea) || 1));
  const mopBags = Math.ceil((((Number(reqK) || 0) / 0.60) / 50) * (Number(npkArea) || 1));

  // 4. Irrigation Requirement Calculator
  const [irrArea, setIrrArea] = useState('3');
  const [soilType, setSoilType] = useState('clay_loam'); // mm/day
  const [cropStage, setCropStage] = useState('vegetative'); // factor
  const dailyET: Record<string, number> = { sandy: 6.5, clay_loam: 5.0, black_soil: 4.2 };
  const stageFactor: Record<string, number> = { seedling: 0.6, vegetative: 1.0, flowering: 1.3, maturity: 0.7 };
  const dailyWaterLiters = (Number(irrArea) || 0) * 4046.86 * (dailyET[soilType] || 5.0) * (stageFactor[cropStage] || 1.0);

  // 5. Yield Estimator
  const [yieldArea, setYieldArea] = useState('2');
  const [plantsPerAcre, setPlantsPerAcre] = useState('22000');
  const [yieldPerPlant, setYieldPerPlant] = useState('0.15'); // kg
  const estimatedYieldKg = (Number(yieldArea) || 0) * (Number(plantsPerAcre) || 0) * (Number(yieldPerPlant) || 0);

  // 6. Revenue / Income Planner
  const [revCropYield, setRevCropYield] = useState('50'); // Quintals
  const [mandiPricePerQtl, setMandiPricePerQtl] = useState('2400'); // Rs / Quintal
  const grossRevenue = (Number(revCropYield) || 0) * (Number(mandiPricePerQtl) || 0);

  // 7. Cost of Cultivation Calculator
  const [costLandPrep, setCostLandPrep] = useState('4500');
  const [costSeeds, setCostSeeds] = useState('3200');
  const [costFert, setCostFert] = useState('6800');
  const [costPest, setCostPest] = useState('4000');
  const [costLabor, setCostLabor] = useState('11000');
  const [costHarvest, setCostHarvest] = useState('5500');
  const totalCultivationCost =
    (Number(costLandPrep) || 0) +
    (Number(costSeeds) || 0) +
    (Number(costFert) || 0) +
    (Number(costPest) || 0) +
    (Number(costLabor) || 0) +
    (Number(costHarvest) || 0);

  // 8. Profit / Loss Calculator
  const [plRevenue, setPlRevenue] = useState('120000');
  const [plExpenses, setPlExpenses] = useState('65000');
  const netProfit = (Number(plRevenue) || 0) - (Number(plExpenses) || 0);
  const profitMargin = (Number(plRevenue) || 0) > 0 ? ((netProfit / (Number(plRevenue) || 1)) * 100).toFixed(1) : '0';

  // 9. Machinery Rental / Usage Calculator
  const [machRatePerHour, setMachRatePerHour] = useState('1200');
  const [machHoursNeeded, setMachHoursNeeded] = useState('8');
  const [fuelCostExtra, setFuelCostExtra] = useState('0');
  const totalMachineryCost = ((Number(machRatePerHour) || 0) * (Number(machHoursNeeded) || 0)) + (Number(fuelCostExtra) || 0);

  // 10. Plant Population / Spacing Calculator
  const [rowSpacingCm, setRowSpacingCm] = useState('60');
  const [plantSpacingCm, setPlantSpacingCm] = useState('20');
  const [spacingAreaAcres, setSpacingAreaAcres] = useState('1');
  const areaSqCm = (Number(spacingAreaAcres) || 1) * 4046.85642 * 10000;
  const plantAreaSqCm = (Number(rowSpacingCm) || 60) * (Number(plantSpacingCm) || 20);
  const totalPlantPopulation = plantAreaSqCm > 0 ? Math.floor(areaSqCm / plantAreaSqCm) : 0;

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 1200, paddingBottom: 60 }}>
        <div className="eyebrow" style={{ color: 'var(--primary)', fontWeight: 800 }}>RYTHU NESTHAM FARM CALCULATORS</div>
        <h1 className="h2" style={{ margin: '4px 0 8px' }}>10 Practical Agricultural Planning Tools</h1>
        <p className="muted" style={{ fontSize: 14, maxWidth: 850 }}>
          Interactive, verified mathematical tools designed specifically for Indian farmers. Accurately calculate seed rates, fertilizer dosages, irrigation requirements, machinery costs, and profit projections.
        </p>

        <div className="grid grid-2" style={{ gap: 20, marginTop: 24 }}>
          {/* 1. Land Area Converter */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e8f7ee', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
                <LandPlot size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>1. Land Area Converter</h3>
                <small className="muted">Acres, Guntas, Cents, Bigha, Hectares, Sq. Yards</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Enter Area</label>
                <input className="input" type="number" step="0.1" value={areaVal} onChange={e => setAreaVal(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Unit</label>
                <select className="input" value={areaFrom} onChange={e => setAreaFrom(e.target.value)}>
                  <option value="acres">Acres</option>
                  <option value="guntas">Guntas (40 per acre)</option>
                  <option value="cents">Cents (100 per acre)</option>
                  <option value="bigha">Bigha (Standard)</option>
                  <option value="hectares">Hectares (2.47 acres)</option>
                  <option value="sq_yards">Square Yards (Gaj)</option>
                </select>
              </div>
            </div>
            <div style={{ background: '#f8faf7', border: '1px solid #e2eae1', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
                <div><b>{(sqMeters / 4046.856).toFixed(3)}</b> Acres</div>
                <div><b>{(sqMeters / 101.171).toFixed(1)}</b> Guntas</div>
                <div><b>{(sqMeters / 40.468).toFixed(1)}</b> Cents</div>
                <div><b>{(sqMeters / 10000).toFixed(3)}</b> Hectares</div>
                <div><b>{(sqMeters * 1.19599).toFixed(1)}</b> Sq. Yards (Gaj)</div>
                <div><b>{sqMeters.toFixed(1)}</b> Sq. Meters</div>
              </div>
            </div>
          </div>

          {/* 2. Seed Rate Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0fdf4', color: '#15803d', display: 'grid', placeItems: 'center' }}>
                <Sprout size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>2. Seed Rate Calculator</h3>
                <small className="muted">ICAR recommended sowing densities</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Select Crop</label>
                <select className="input" value={cropSeed} onChange={e => setCropSeed(e.target.value)}>
                  <option value="paddy">Paddy / Rice</option>
                  <option value="cotton">Bt Cotton</option>
                  <option value="chilli">Chilli (Mirchi)</option>
                  <option value="maize">Hybrid Maize</option>
                  <option value="tomato">Hybrid Tomato</option>
                  <option value="groundnut">Groundnut (Peanut)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Field Area (Acres)</label>
                <input className="input" type="number" step="0.25" value={seedArea} onChange={e => setSeedArea(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#166534' }}>
                Required Seeds: <b style={{ fontSize: 18, color: '#14532d' }}>{totalSeedNeeded.toFixed(2)} kg</b> for {seedArea} acres
              </div>
              <small style={{ color: '#15803d', display: 'block', marginTop: 4 }}>{seedRates[cropSeed]?.desc}</small>
            </div>
          </div>

          {/* 3. Fertilizer / NPK Bag Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef3c7', color: '#b45309', display: 'grid', placeItems: 'center' }}>
                <Scale size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>3. Fertilizer (NPK to Bags) Calculator</h3>
                <small className="muted">Converts N-P-K recommendation to Urea, DAP, MOP (50kg bags)</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Acres</label>
                <input className="input" type="number" value={npkArea} onChange={e => setNpkArea(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>N (kg/ac)</label>
                <input className="input" type="number" value={reqN} onChange={e => setReqN(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>P₂O₅ (kg/ac)</label>
                <input className="input" type="number" value={reqP} onChange={e => setReqP(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>K₂O (kg/ac)</label>
                <input className="input" type="number" value={reqK} onChange={e => setReqK(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#92400e' }}>
                <span>DAP: <b>{dapBags} Bags (50kg)</b></span>
                <span>Urea: <b>{ureaBags} Bags (50kg)</b></span>
                <span>MOP: <b>{mopBags} Bags (50kg)</b></span>
              </div>
              <small style={{ color: '#b45309', display: 'block', marginTop: 4 }}>*Takes into account 18% N already supplied through DAP.</small>
            </div>
          </div>

          {/* 4. Irrigation Requirement Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#eff6ff', color: '#2563eb', display: 'grid', placeItems: 'center' }}>
                <Droplets size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>4. Daily Irrigation Water Requirement</h3>
                <small className="muted">Estimates evapotranspiration & crop water duty</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Field Area (Acres)</label>
                <input className="input" type="number" value={irrArea} onChange={e => setIrrArea(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Soil Type</label>
                <select className="input" value={soilType} onChange={e => setSoilType(e.target.value)}>
                  <option value="clay_loam">Clay Loam (Moderate)</option>
                  <option value="sandy">Sandy / Red Loam (High)</option>
                  <option value="black_soil">Black Cotton (Moisture Retentive)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Growth Stage</label>
                <select className="input" value={cropStage} onChange={e => setCropStage(e.target.value)}>
                  <option value="seedling">Seedling / Early</option>
                  <option value="vegetative">Vegetative</option>
                  <option value="flowering">Flowering / Fruit Setting</option>
                  <option value="maturity">Grain Filling / Maturity</option>
                </select>
              </div>
            </div>
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#1e40af' }}>
                Daily Water Needed: <b style={{ fontSize: 18, color: '#1e3a8a' }}>{Math.round(dailyWaterLiters).toLocaleString()} Liters / Day</b>
              </div>
              <small style={{ color: '#3b82f6', display: 'block', marginTop: 4 }}>Approx {((dailyWaterLiters / 3600) / 200).toFixed(1)} hours running on a 5HP pump (200 LPM discharge).</small>
            </div>
          </div>

          {/* 5. Yield Estimator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fdf4ff', color: '#c026d3', display: 'grid', placeItems: 'center' }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>5. Harvest Yield Estimator</h3>
                <small className="muted">Forecast harvest based on plant density and boll/ear weight</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Area (Acres)</label>
                <input className="input" type="number" value={yieldArea} onChange={e => setYieldArea(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Plants / Acre</label>
                <input className="input" type="number" value={plantsPerAcre} onChange={e => setPlantsPerAcre(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Avg Yield/Plant (kg)</label>
                <input className="input" type="number" step="0.01" value={yieldPerPlant} onChange={e => setYieldPerPlant(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#fdf4ff', border: '1px solid #f5d0fe', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#86198f' }}>
                Projected Total Harvest: <b style={{ fontSize: 18, color: '#701a75' }}>{estimatedYieldKg.toLocaleString()} kg</b> ({ (estimatedYieldKg / 100).toFixed(1) } Quintals)
              </div>
              <small style={{ color: '#a21caf', display: 'block', marginTop: 4 }}>Yield per acre: {((estimatedYieldKg / (Number(yieldArea) || 1)) / 100).toFixed(1)} Quintals / Acre</small>
            </div>
          </div>

          {/* 6. Revenue Planner */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0fdfa', color: '#0d9488', display: 'grid', placeItems: 'center' }}>
                <DollarSign size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>6. Gross Mandi Revenue Planner</h3>
                <small className="muted">Forecast gross market earnings</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Total Harvest (Quintals)</label>
                <input className="input" type="number" value={revCropYield} onChange={e => setRevCropYield(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Expected Rate (₹ / Quintal)</label>
                <input className="input" type="number" value={mandiPricePerQtl} onChange={e => setMandiPricePerQtl(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#115e59' }}>
                Estimated Gross Revenue: <b style={{ fontSize: 18, color: '#134e4a' }}>₹{grossRevenue.toLocaleString('en-IN')}</b>
              </div>
              <small style={{ color: '#0f766e', display: 'block', marginTop: 4 }}>Calculation: {revCropYield} Quintals × ₹{mandiPricePerQtl}/Qtl</small>
            </div>
          </div>

          {/* 7. Cost of Cultivation Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fff1f2', color: '#e11d48', display: 'grid', placeItems: 'center' }}>
                <Calculator size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>7. Cost of Cultivation Breakdown</h3>
                <small className="muted">Tally expenses across all farming activities</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <div>
                <label style={{ fontSize: 10, fontWeight: 700 }}>Land Prep (₹)</label>
                <input className="input" type="number" value={costLandPrep} onChange={e => setCostLandPrep(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 700 }}>Seeds / Seedlings (₹)</label>
                <input className="input" type="number" value={costSeeds} onChange={e => setCostSeeds(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 700 }}>Fertilizers & FYM (₹)</label>
                <input className="input" type="number" value={costFert} onChange={e => setCostFert(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 700 }}>Crop Protection (₹)</label>
                <input className="input" type="number" value={costPest} onChange={e => setCostPest(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 700 }}>Labor & Weeding (₹)</label>
                <input className="input" type="number" value={costLabor} onChange={e => setCostLabor(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 10, fontWeight: 700 }}>Harvest & Transport (₹)</label>
                <input className="input" type="number" value={costHarvest} onChange={e => setCostHarvest(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#9f1239' }}>
                Total Cultivation Investment: <b style={{ fontSize: 18, color: '#881337' }}>₹{totalCultivationCost.toLocaleString('en-IN')}</b>
              </div>
            </div>
          </div>

          {/* 8. Net Profit / Loss Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f3e8ff', color: '#9333ea', display: 'grid', placeItems: 'center' }}>
                <Percent size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>8. Net Profit & ROI Calculator</h3>
                <small className="muted">Net return after all input and operational deductions</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Total Revenue (₹)</label>
                <input className="input" type="number" value={plRevenue} onChange={e => setPlRevenue(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700 }}>Total Expenses (₹)</label>
                <input className="input" type="number" value={plExpenses} onChange={e => setPlExpenses(e.target.value)} />
              </div>
            </div>
            <div style={{ background: netProfit >= 0 ? '#f0fdf4' : '#fff1f2', border: `1px solid ${netProfit >= 0 ? '#bbf7d0' : '#fecdd3'}`, borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: netProfit >= 0 ? '#166534' : '#9f1239' }}>
                {netProfit >= 0 ? 'Net Profit' : 'Net Loss'}: <b style={{ fontSize: 18, color: netProfit >= 0 ? '#14532d' : '#881337' }}>₹{Math.abs(netProfit).toLocaleString('en-IN')}</b>
              </div>
              <small style={{ color: netProfit >= 0 ? '#15803d' : '#be123c', display: 'block', marginTop: 4 }}>
                Profit Margin: <b>{profitMargin}%</b> | ROI: <b>{(((netProfit) / (Number(plExpenses) || 1)) * 100).toFixed(1)}%</b>
              </small>
            </div>
          </div>

          {/* 9. Machinery Rental Cost Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fef2f2', color: '#dc2626', display: 'grid', placeItems: 'center' }}>
                <Wrench size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>9. Machinery Custom Hiring Cost</h3>
                <small className="muted">Tractor, Rotavator, Harvester rental estimation</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Rate / Hour (₹)</label>
                <input className="input" type="number" value={machRatePerHour} onChange={e => setMachRatePerHour(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Hours Needed</label>
                <input className="input" type="number" step="0.5" value={machHoursNeeded} onChange={e => setMachHoursNeeded(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Extra Fuel/Driver (₹)</label>
                <input className="input" type="number" value={fuelCostExtra} onChange={e => setFuelCostExtra(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#991b1b' }}>
                Total Machinery Rental: <b style={{ fontSize: 18, color: '#7f1d1d' }}>₹{totalMachineryCost.toLocaleString('en-IN')}</b>
              </div>
              <small style={{ color: '#b91c1c', display: 'block', marginTop: 4 }}>
                For {machHoursNeeded} hours at ₹{machRatePerHour}/hr {Number(fuelCostExtra) > 0 ? `+ ₹${fuelCostExtra} fuel` : ''}
              </small>
            </div>
          </div>

          {/* 10. Plant Population & Spacing Calculator */}
          <div className="card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f5f3ff', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
                <Grid size={22} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>10. Plant Population / Spacing</h3>
                <small className="muted">Target plant canopy density per acre</small>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Row Spacing (cm)</label>
                <input className="input" type="number" value={rowSpacingCm} onChange={e => setRowSpacingCm(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Plant Spacing (cm)</label>
                <input className="input" type="number" value={plantSpacingCm} onChange={e => setPlantSpacingCm(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700 }}>Acres</label>
                <input className="input" type="number" value={spacingAreaAcres} onChange={e => setSpacingAreaAcres(e.target.value)} />
              </div>
            </div>
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 12, padding: 12, marginTop: 14 }}>
              <div style={{ fontSize: 13, color: '#5b21b6' }}>
                Target Plant Count: <b style={{ fontSize: 18, color: '#4c1d95' }}>{totalPlantPopulation.toLocaleString()} Plants</b>
              </div>
              <small style={{ color: '#6d28d9', display: 'block', marginTop: 4 }}>
                Spacing: {rowSpacingCm} cm × {plantSpacingCm} cm ({((Number(rowSpacingCm) * Number(plantSpacingCm)) / 10000).toFixed(2)} m² per plant)
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
