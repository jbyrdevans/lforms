// Initializes the FHIR structure for R4
//var LForms = require('lforms');
import * as LForms from '../../../lforms';
import {LOINC_URI} from '../fhir-common';
import dr from '../diagnostic-report.js';
import commonExport from './export.js';
import fhir_sdc from './sdc-export.js';
import addCommonSDCExportFns from '../sdc-export-common.js';
import addSDCImportFns from './sdc-import.js';
import addCommonSDCFns from '../sdc-common.js';
import addCommonSDCImportFns from '../sdc-import-common.js';
import { addCommonRuntimeFns } from '../runtime-common.js';

export function init() {
  let fhirVersion = 'R4';
  if (!LForms.FHIR)
    LForms.FHIR = {};
  var fhir = LForms.FHIR[fhirVersion] = {
    LOINC_URI: LOINC_URI
  };
  fhir.fhirpath = require('fhirpath');
  fhir.fhirpathModel = require('fhirpath/fhir-context/r4');
  fhir.DiagnosticReport = dr;
  fhir.DiagnosticReport._commonExport = commonExport;
  fhir.SDC = fhir_sdc;
  fhir.SDC._commonExport = commonExport;
  addCommonSDCExportFns(fhir.SDC);
  addSDCImportFns(fhir.SDC);
  addCommonSDCFns(fhir.SDC);
  addCommonSDCImportFns(fhir.SDC);
  addCommonRuntimeFns(fhir.SDC);
  fhir.SDC.fhirVersion = fhirVersion; // Needed by lfData for fhirpath, etc.

  fhir.reservedVarNames = {};
  ['context', 'resource'].forEach(function(name) {
    fhir.reservedVarNames[name] = true;
  });
}



