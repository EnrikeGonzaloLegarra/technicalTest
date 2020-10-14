import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import GeniallyIsValidName from "../../../../../src/contexts/core/genially/domain/GeniallyIsValidName";
import GeniallyIsEmptyName from "../../../../../src/contexts/core/genially/domain/GeniallyIsEmptyName";
import GeniallyIsValidDescription from "../../../../../src/contexts/core/genially/domain/GeniallyIsValidDescription";

describe("Genially Entity", () => {
    it("Create OK all params valid", () => {
        const id = "1";
        const name = "Enrique";
        const description = "EnriqueEnriqueEnriqueEnriqueEnriqueEnrique";

        const genially: Genially = new Genially(id, name, description);

        expect(genially.id).toMatch(id);
        expect(genially.name).toMatch(name);
        expect(genially.description).toMatch(description);
    });

    it("Create KO name empty", () => {
        expect(() => new Genially("1", "")).toThrowError(GeniallyIsEmptyName);
    });
    it("Create KO max length invalid", () => {
        expect(() => new Genially("1", "EnriqueEnriqueEnriqueEnriqueEnriqueEnrique")).toThrowError(
            GeniallyIsValidName
        );
    });
    it("Create KO min length invalid and max length invalid", () => {
        expect(() => new Genially("1", "E")).toThrowError(
            GeniallyIsValidName
        );

    });

    it("Create KO description max length invalid", () => {
        expect(
            () =>
                new Genially(
                    "1",
                    "Enrique",
                    "EnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnriqueEnrique9"
                )
        ).toThrowError(GeniallyIsValidDescription);
    });

    it("Delete OK", () => {
        const genially: Genially = new Genially("1", "Enrique", "EnriqueEnrique");
        genially.delete();
        expect(genially.deletedAt).not.toBeUndefined();
    });

    it("Rename OK", () => {
        const newName: string = "newName";
        const genially: Genially = new Genially("1", "EnriqueEnrique", "descEnriqueEnriqueEnriqueription");
        genially.rename(newName);
        expect(genially.name).toMatch(newName);
        expect(genially.modifiedAt).not.toBeUndefined();
    });

});
